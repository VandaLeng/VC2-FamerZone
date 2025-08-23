<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $users = User::with('roles')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($users);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|exists:roles,name',
            'phone' => 'nullable|string|max:20',
            'province_id' => 'required|exists:provinces,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $role = Role::where('name', $request->role)->firstOrFail();

        $imageName = 'default.jpg';

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/users', $imageName);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'province_id' => $request->province_id,
            'image' => $imageName,
            'role_id' => $role->id,
        ]);

        $user->assignRole($request->role);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user->load('roles', 'province')
        ]);
    }

    function update(Request $request, $id)
    {
        // Try to find the user, return 404 if not found
        try {
            $user = User::findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        // Validate the request
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'role' => 'nullable|string|exists:roles,name',
            'phone' => 'nullable|string|max:20',
            'province' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Fill only provided values, keep existing for missing fields
        $user->fill($request->only(['name', 'email', 'phone', 'province']));

        // Update password if provided
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        // Update role if provided
        if ($request->filled('role')) {
            $role = Role::where('name', $request->role)->first();
            if ($role) {
                $user->role_id = $role->id;
                $user->syncRoles([$request->role]);
            }
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($user->image && $user->image !== 'default.jpg' && Storage::exists('public/users/' . $user->image)) {
                Storage::delete('public/users/' . $user->image);
            }
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/users', $imageName);
            $user->image = $imageName;
        }

        // Save changes
        $user->save();

        // Return updated data
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user->load('roles')->append('image_url')
        ]);
    }







    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->image && $user->image !== 'default.jpg' && Storage::exists('public/users/' . $user->image)) {
            Storage::delete('public/users/' . $user->image);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function assignRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|string|exists:roles,name',
        ]);

        $user = User::findOrFail($id);
        $user->assignRole($request->role);

        return response()->json([
            'message' => "Role '{$request->role}' assigned to user '{$user->name}'",
            'user' => $user->load('roles')
        ]);
    }

    public function removeRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|string|exists:roles,name',
        ]);

        $user = User::findOrFail($id);
        $user->removeRole($request->role);

        return response()->json([
            'message' => "Role '{$request->role}' removed from user '{$user->name}'",
            'user' => $user->load('roles')
        ]);
    }

    public function assignPermission(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'permission' => 'required|string|exists:permissions,name',
        ]);

        $user->givePermissionTo($request->permission);

        return response()->json(['message' => 'Permission assigned to user']);
    }

    public function uploadImage(Request $request, $id)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = User::findOrFail($id);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            if ($user->image && $user->image !== 'default.jpg' && Storage::exists('public/users/' . $user->image)) {
                Storage::delete('public/users/' . $user->image);
            }

            $image->storeAs('public/users', $imageName);

            $user->image = $imageName;
            $user->save();

            return response()->json([
                'message' => 'Image uploaded successfully',
                'image_url' => url('storage/users/' . $imageName),
            ], 200);
        }

        return response()->json(['message' => 'No image uploaded'], 400);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 403);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully']);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|nullable|string|min:6|confirmed',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'address' => 'sometimes|nullable|string|max:255',
            'phone' => 'sometimes|nullable|string|max:20',
        ]);

        if ($request->has('name')) {
            $user->name = $request->name;
        }

        if ($request->has('email')) {
            $user->email = $request->email;
        }

        if ($request->has('address')) {
            $user->address = $request->address;
        }

        if ($request->has('phone')) {
            $user->phone = $request->phone;
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            if ($user->image && $user->image !== 'default.jpg' && Storage::exists('public/users/' . $user->image)) {
                Storage::delete('public/users/' . $user->image);
            }

            $image->storeAs('public/users', $imageName);
            $user->image = $imageName;
        }

        $user->save();

        $user->load('roles', 'permissions');

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }

    public function updateImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = $request->user();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            if ($user->image && $user->image !== 'default.jpg' && Storage::exists('public/users/' . $user->image)) {
                Storage::delete('public/users/' . $user->image);
            }

            $image->storeAs('public/users', $imageName);

            $user->image = $imageName;
        
        }

        return response()->json(['message' => 'No image uploaded'], 400);
    }

    // New method to fetch authenticated user's profile
    public function getProfile(Request $request)
    {
        $user = $request->user();
        $user->load('roles');
        return response()->json([
            'data' => $user
        ]);
    }
}
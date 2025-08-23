<?php
// File: UserController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    // List users
    public function index(Request $request)
    {
        $search = $request->query('search');
        $users = User::with('roles', 'province')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%$search%")
                      ->orWhere('email', 'like', "%$search%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($users);
    }

    // Create new user
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
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user->load('roles', 'province')
        ]);
    }

    // Update user (admin or specific user)
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'role' => 'nullable|string|exists:roles,name',
            'phone' => 'nullable|string|max:20',
            'province_id' => 'nullable|exists:provinces,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user->fill($request->only(['name', 'email', 'phone', 'province_id']));

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        if ($request->filled('role')) {
            $role = Role::where('name', $request->role)->first();
            if ($role) {
                $user->role_id = $role->id;
                $user->syncRoles([$request->role]);
            }
        }

        if ($request->hasFile('image')) {
            if ($user->image && $user->image !== 'default.jpg' && Storage::exists('public/users/' . $user->image)) {
                Storage::delete('public/users/' . $user->image);
            }
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/users', $imageName);
            $user->image = $imageName;
        }

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'user' => $user->load('roles', 'province')->append('image_url')
        ]);
    }

    // Delete user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->image && $user->image !== 'default.jpg' && Storage::exists('public/users/' . $user->image)) {
            Storage::delete('public/users/' . $user->image);
        }
        $user->delete();

        return response()->json(['status' => 'success', 'message' => 'User deleted successfully']);
    }

    // Assign role
    public function assignRole(Request $request, $id)
    {
        $request->validate(['role' => 'required|string|exists:roles,name']);
        $user = User::findOrFail($id);
        $user->assignRole($request->role);

        return response()->json(['status' => 'success', 'message' => "Role assigned", 'user' => $user->load('roles')]);
    }

    // Remove role
    public function removeRole(Request $request, $id)
    {
        $request->validate(['role' => 'required|string|exists:roles,name']);
        $user = User::findOrFail($id);
        $user->removeRole($request->role);

        return response()->json(['status' => 'success', 'message' => "Role removed", 'user' => $user->load('roles')]);
    }

    // Change password (authenticated user)
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['status' => 'error', 'message' => 'Current password is incorrect'], 403);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['status' => 'success', 'message' => 'Password changed successfully']);
    }

    // Get authenticated user's profile
    public function getProfile(Request $request)
    {
        $user = $request->user()->load('roles', 'province');
        $roleName = $user->roles->isNotEmpty() ? $user->roles->first()->name : null;
        $provinceName = $user->province ? $user->province->province_name : null;

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $roleName,
                'role_id' => $user->role_id,
                'province' => $provinceName,
                'province_id' => $user->province_id,
                'image' => $user->image,
                'image_url' => $user->image && $user->image !== 'default.jpg' ? url('storage/users/' . $user->image) : null,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]
        ]);
    }

    // Update authenticated user's profile (including password)
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone' => 'sometimes|nullable|string|max:20',
            'province_id' => 'sometimes|nullable|exists:provinces,id',
            'current_password' => 'sometimes|required_with:password|string',
            'password' => 'sometimes|nullable|string|min:6|confirmed',
        ]);

        if ($request->filled('password')) {
            if (!$request->filled('current_password') || !Hash::check($request->current_password, $user->password)) {
                return response()->json(['status' => 'error', 'message' => 'Current password is incorrect'], 403);
            }
            $user->password = Hash::make($request->password);
        }

        $user->fill($request->only(['name', 'email', 'phone', 'province_id']));
        $user->save();

        $user->load('roles', 'province');
        $roleName = $user->roles->isNotEmpty() ? $user->roles->first()->name : null;
        $provinceName = $user->province ? $user->province->province_name : null;

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $roleName,
                'role_id' => $user->role_id,
                'province' => $provinceName,
                'province_id' => $user->province_id,
                'image' => $user->image,
                'image_url' => $user->image && $user->image !== 'default.jpg' ? url('storage/users/' . $user->image) : null,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]
        ]);
    }

    // Update profile image
    public function updateImage(Request $request)
    {
        $request->validate(['image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048']);

        $user = $request->user();

        if ($request->hasFile('image')) {
            if ($user->image && $user->image !== 'default.jpg' && Storage::exists('public/users/' . $user->image)) {
                Storage::delete('public/users/' . $user->image);
            }

            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/users', $imageName);

           
            $user->image = $imageName;
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Profile image updated successfully',
                'data' => [
                    'image' => $imageName,
                    'image_url' => url('storage/users/' . $imageName)
                ]
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No image file provided'
        ], 400);
    }

    // Delete profile image
    public function deleteImage(Request $request)
    {
        $user = $request->user();

        if ($user->image && $user->image !== 'default.jpg' && Storage::exists('public/users/' . $user->image)) {
            Storage::delete('public/users/' . $user->image);
            $user->image = 'default.jpg';
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Profile image deleted successfully',
                'data' => [
                    'image' => $user->image,
                    'image_url' => null
                ]
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No profile image to delete'
        ], 400);
    }
}

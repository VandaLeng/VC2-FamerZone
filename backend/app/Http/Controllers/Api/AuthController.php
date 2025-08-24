<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // ✅ Register user - FIXED to handle provinces properly
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|max:20',
            'province_id' => 'required|exists:provinces,id',
            'role' => 'required|string|in:buyer,farmer',
        ]);

        $role = Role::where('name', $validated['role'])->firstOrFail();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'phone' => $validated['phone'] ?? null,
            'province_id' => $validated['province_id'],
            'role_id' => $role->id,
        ]);

        $user->assignRole($validated['role']);

        // Load relationships for complete data
        $user->load('province', 'roles');

        $token = $user->createToken('auth_token')->plainTextToken;

        // FIXED: Return complete user data with province info
        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $validated['role'],
                'role_id' => $user->role_id,
                'province_id' => $user->province_id,
                'province' => $user->province ? $user->province->province_name : null,
                'image' => $user->image,
                'image_url' => $user->image && $user->image !== 'default.jpg' ? url('storage/users/' . $user->image) : null,
                'roles' => $user->roles,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    // ✅ Login user - FIXED to handle provinces properly
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $credentials['email'])->with('province', 'roles')->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Get primary role name
        $roleName = null;
        if ($user->roles->isNotEmpty()) {
            $roleName = $user->roles->first()->name;
        }

        // FIXED: Return complete user data with province info
        return response()->json([
            'message' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $roleName,
                'role_id' => $user->role_id,
                'province_id' => $user->province_id,
                'province' => $user->province ? $user->province->province_name : null,
                'image' => $user->image,
                'image_url' => $user->image && $user->image !== 'default.jpg' ? url('storage/users/' . $user->image) : null,
                'roles' => $user->roles,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $user->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully']);
        }
        return response()->json(['error' => 'No authenticated user'], 401);
    }

    // ✅ Update profile - FIXED
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'province_id' => 'nullable|exists:provinces,id',
        ]);

        $user->update($validated);
        $user->load('province', 'roles');

        // Get primary role name
        $roleName = null;
        if ($user->roles->isNotEmpty()) {
            $roleName = $user->roles->first()->name;
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $roleName,
                'role_id' => $user->role_id,
                'province_id' => $user->province_id,
                'province' => $user->province ? $user->province->province_name : null,
                'image' => $user->image,
                'image_url' => $user->image && $user->image !== 'default.jpg' ? url('storage/users/' . $user->image) : null,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]
        ]);
    }

    // ✅ Update image - FIXED
    public function updateImage(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            // Delete old image if exists
            if ($user->image && $user->image !== 'default.jpg' && \Storage::exists('public/users/' . $user->image)) {
                \Storage::delete('public/users/' . $user->image);
            }

            $image->storeAs('public/users', $imageName);
            $user->image = $imageName;
            $user->save();

            return response()->json([
                'message' => 'Profile image updated successfully',
                'image_url' => url('storage/users/' . $imageName)
            ]);
        }

        return response()->json([
            'message' => 'No image file provided'
        ], 400);
    }
}
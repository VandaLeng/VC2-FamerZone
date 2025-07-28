<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function allUsers()
    {
        return response()->json(User::with('roles','permissions')->get());
    }

    public function assignRole(Request $request, User $user)
    {
        $request->validate(['role' => 'required|exists:roles,name']);
        $user->syncRoles($request->role);
        return response()->json(['message' => 'Role assigned', 'user' => $user]);
    }
}
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        return response()->json([
            'message' => 'Roles retrieved successfully',
            'data' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles',
        ]);

        $role = Role::create([
            'name' => $request->name,
            'guard_name' => 'web', 
        ]);

        return response()->json([
            'message' => 'Role created successfully',
            'data' => $role,
        ], 201);
    }

    // Update role
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $id,
        ]);

        try {
            $role = Role::findOrFail($id);
            $role->name = $request->name;
            $role->save();

            return response()->json([
                'message' => 'Role updated successfully',
                'data' => $role,
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Role not found',
            ], 404);
        }
    }

    // Delete role
    public function destroy($id)
    {
        try {
            $role = Role::findOrFail($id);

            // Optional: Check if role is assigned to any user before deleting
            if ($role->users()->count() > 0) {
                return response()->json([
                    'message' => 'Role is assigned to users and cannot be deleted',
                ], 400);
            }

            $role->delete();

            return response()->json([
                'message' => 'Role deleted successfully',
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Role not found',
            ], 404);
        }
    }

}

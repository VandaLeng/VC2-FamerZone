<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    // List all permissions
    public function index()
    {
        return response()->json(Permission::all());
    }

    // Create new permission
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
        ]);

        $permission = Permission::create([
            'name' => $request->name,
            'guard_name' => 'web', // <-- force it to web
        ]);

        return response()->json([
            'message' => 'Permission created',
            'permission' => $permission,
        ]);
    }

    // Assign permission to a role
    public function assignToRole(Request $request)
    {
        $request->validate([
            'role' => 'required|string|exists:roles,name',
            'permission' => 'required|string|exists:permissions,name',
            
        ]);

        $role = Role::findByName($request->role, 'web');
        $role->givePermissionTo($request->permission);

        return response()->json(['message' => 'Permission assigned to role']);
    }


    // Update existing permission
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name,' . $id,
        ]);

        $permission = Permission::findOrFail($id);
        $permission->name = $request->name;
        $permission->save();

        return response()->json([
            'message' => 'Permission updated successfully',
            'data' => $permission,
        ]);
    }

    // Delete a permission
    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return response()->json([
            'message' => 'Permission deleted successfully',
        ]);
    }

}
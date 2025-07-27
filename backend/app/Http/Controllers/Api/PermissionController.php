<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();
        return response()->json([
            'status' => true,
            'permissions' => $permissions,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:permissions,name']);

        $permission = Permission::create([
            'name' => $request->name,
            'guard_name' => 'web',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Permission created successfully.',
            'permission' => $permission,
        ]);
    }

    public function update(Request $request, $id)
    {
        $permission = Permission::findOrFail($id);

        $request->validate(['name' => 'required|unique:permissions,name,' . $id]);

        $permission->name = $request->name;
        $permission->save();

        return response()->json([
            'status' => true,
            'message' => 'Permission updated successfully.',
            'permission' => $permission,
        ]);
    }

    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return response()->json([
            'status' => true,
            'message' => 'Permission deleted successfully.',
        ]);
    }

    public function assignToRole(Request $request)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
            'permission_ids' => 'required|array',
            'permission_ids.*' => 'exists:permissions,id',
        ]);

        $role = Role::findOrFail($request->role_id);
        $role->syncPermissions($request->permission_ids);

        return response()->json([
            'status' => true,
            'message' => 'Permissions assigned to role successfully.',
            'role' => $role->name,
            'permissions' => $role->permissions->pluck('name'),
        ]);
    }
}
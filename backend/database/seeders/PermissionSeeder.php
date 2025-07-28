<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'manage roles',
            'manage permissions',
            'view products',
            'create products',
            'edit products',
            'delete products',
            'buy products',
            'view orders',
            'create orders',
            'view own profile',
            'edit own profile',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $roles = [
            ['name' => 'admin', 'permissions' => $permissions],
            ['name' => 'user', 'permissions' => [
                'view products',
                'buy products',
                'view orders',
                'create orders',
                'view own profile',
                'edit own profile',
            ]],
            ['name' => 'farmer', 'permissions' => [
                'view products',
                'create products',
                'edit products',
                'delete products',
                'view own profile',
                'edit own profile',
            ]],
            ['name' => 'buyer', 'permissions' => [
                'view products',
                'buy products',
                'view orders',
                'create orders',
                'view own profile',
                'edit own profile',
            ]],
        ];

        foreach ($roles as $roleData) {
            $role = Role::firstOrCreate(['name' => $roleData['name'], 'guard_name' => 'web']);
            $role->syncPermissions($roleData['permissions']);
        }
    }
}
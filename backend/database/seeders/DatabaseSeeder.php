<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Run PermissionSeeder first to create roles and permissions
        $this->call(PermissionSeeder::class);
        // Then run AdminSeeder to create admin user
        $this->call(AdminSeeder::class);
    }
}
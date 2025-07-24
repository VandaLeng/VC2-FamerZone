<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        $admin = User::firstOrCreate([
            'email' => 'admin@gmail.com',
        ], [
            'name' => 'admin',
<<<<<<< HEAD
            'password' => bcrypt('password'),
            // 'image' => 'default.jpg',
=======
            'password' => bcrypt('password')

>>>>>>> 1f3c2f04c229ff4bbea80f7c98d648c2e47ffef6
        ]);

        $admin->assignRole($adminRole);
    }
}

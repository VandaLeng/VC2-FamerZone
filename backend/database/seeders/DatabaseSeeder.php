<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Order;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Run role/permission seeder
        $this->call(PermissionSeeder::class);

        // 2. Run AdminSeeder
        $this->call(AdminSeeder::class);

        // 3. Get the first admin user (created by AdminSeeder)
        $user = User::first();

        // 4. Create an order for that user
        if ($user) {
            Order::create([
                'user_id' => $user->id,
                'total_price' => 2.00,
                'date' => now(),
                'address' => 'PNC',
                'status' => 'confirmed',
            ]);
        }
    }
}

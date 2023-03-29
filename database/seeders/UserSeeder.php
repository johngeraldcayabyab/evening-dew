<?php

namespace Database\Seeders;

use App\Events\UserCreated;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'System',
            'email' => 'system@system.system',
            'password' => Hash::make(Str::uuid()),
            'app_menu_id' => 1
        ]);
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin'),
            'app_menu_id' => 1
        ]);
        UserCreated::dispatch($admin);
    }
}

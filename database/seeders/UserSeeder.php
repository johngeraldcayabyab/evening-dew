<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::factory([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin')
        ])->create();

        User::factory([
            'name' => 'Taste and Tell',
            'email' => 'tasteandtellmnla@gmail.com',
            'password' => Hash::make('admin')
        ])->create();
    }
}

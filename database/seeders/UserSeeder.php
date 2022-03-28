<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin')
        ]);

        User::create([
            'name' => 'Taste and Tell',
            'email' => 'tasteandtellmnla@gmail.com',
            'password' => Hash::make('admin')
        ]);
    }
}

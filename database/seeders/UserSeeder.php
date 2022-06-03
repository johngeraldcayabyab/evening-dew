<?php

namespace Database\Seeders;

use App\Events\UserCreatedEvent;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin')
        ]);
        UserCreatedEvent::dispatch($admin);
    }
}

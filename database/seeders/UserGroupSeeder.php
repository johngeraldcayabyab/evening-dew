<?php

namespace Database\Seeders;

use App\Models\UserGroup;
use Illuminate\Database\Seeder;

class UserGroupSeeder extends Seeder
{
    public function run()
    {
        UserGroup::create([
            'name' => 'Administrator'
        ]);
    }
}

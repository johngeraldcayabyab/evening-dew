<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\User;
use App\Models\UserGroupLine;
use Illuminate\Database\Seeder;

class UserGroupLineSeeder extends Seeder
{
    public function run()
    {
        $user = User::where('name', 'Admin')->first();
        $group = Group::where('name', 'Administrator')->first();
        $userGroupLineData['user_id'] = $user->id;
        $userGroupLineData['group_id'] = $group->id;
        UserGroupLine::create($userGroupLineData);
    }
}

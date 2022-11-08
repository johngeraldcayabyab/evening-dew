<?php

namespace Database\Seeders;

use App\Models\UserGroup;
use Illuminate\Database\Seeder;

class UserGroupSeeder extends Seeder
{
    public function run()
    {
        $menus = (new MenuSeeder())->getData();
        foreach ($menus as $menu) {
            UserGroup::create([
                'name' => $menu['name'] . '.administrator'
            ]);
        }
    }
}

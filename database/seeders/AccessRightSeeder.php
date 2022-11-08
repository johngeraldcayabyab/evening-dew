<?php

namespace Database\Seeders;

use App\Models\AccessRight;
use Illuminate\Database\Seeder;

class AccessRightSeeder extends Seeder
{
    public function run()
    {
        /**
         * Access rights are based on what you see and what you "Don't see"
         * The source of truth is in the menu seeder
         */
        $menus = (new MenuSeeder())->getData();
        foreach ($menus as $menu) {
            AccessRight::create([
                'name' => str_replace('/', '', $menu['url']) . '.administrator',
                'user_group_id' => 1,
            ]);
        }
    }
}

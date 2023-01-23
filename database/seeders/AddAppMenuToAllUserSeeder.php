<?php

namespace Database\Seeders;

use App\Models\AppMenu;
use App\Models\Menu;
use App\Models\Source;
use App\Models\User;
use Illuminate\Database\Seeder;

class AddAppMenuToAllUserSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            $user->app_menu_id = 1;
            $user->save();
        }

        Source::create([
            'name' => 'SM North',
            'color' => '#19125f',
        ]);

        $menu = Menu::create([
            'label' => 'SM North',
            'url' => '/sm_north',
        ]);

        AppMenu::create([
            'label' => $menu->label,
            'menu_id' => $menu->id,
            'parent_app_menu_id' => 5
        ]);
    }
}

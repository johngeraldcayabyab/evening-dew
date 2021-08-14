<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'label' => 'Home',
                'url' => '/',
            ],
            [
                'label' => 'Measures Categories',
                'url' => '/measures_categories',
            ],
            [
                'label' => 'Measures Categories Create',
                'url' => '/measures_categories/create',
            ],
            [
                'label' => 'Menus',
                'url' => '/menus',
            ],
            [
                'label' => 'Menus Create',
                'url' => '/menus/create',
            ],
        ];

        foreach ($data as $datum) {
            Menu::create($datum);
        }
    }
}

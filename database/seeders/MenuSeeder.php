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
                'label' => 'Menus',
                'url' => '/menus',
            ],
        ];

        foreach ($data as $datum) {
            Menu::create($datum);
        }
    }
}

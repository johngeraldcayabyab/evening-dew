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
                'label' => 'Measurement Categories',
                'url' => '/measurement_categories',
            ],
            [
                'label' => 'Measurements',
                'url' => '/measurements',
            ],
            [
                'label' => 'Menus',
                'url' => '/menus',
            ],
            [
                'label' => 'Users',
                'url' => '/users',
            ],
        ];

        foreach ($data as $datum) {
            Menu::create($datum);
        }
    }
}

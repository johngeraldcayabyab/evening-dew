<?php

namespace App\Modules\Menu\Seeders;

use App\Modules\Menu\Models\Menu;
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
        ];

        foreach ($data as $datum) {
            Menu::create($datum);
        }
    }
}

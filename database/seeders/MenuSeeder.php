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
                'label' => 'Addresses',
                'url' => '/addresses',
            ],
            [
                'label' => 'Countries',
                'url' => '/countries',
            ],
            [
                'label' => 'Currencies',
                'url' => '/currencies',
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
            [
                'label' => 'Product Categories',
                'url' => '/product_categories',
            ],
            [
                'label' => 'Products',
                'url' => '/products',
            ],
            [
                'label' => 'Sequences',
                'url' => '/sequences',
            ],
            [
                'label' => 'Users',
                'url' => '/users',
            ],
            [
                'label' => 'Global Settings',
                'url' => '/global_settings',
            ],
        ];

        foreach ($data as $datum) {
            Menu::create($datum);
        }
    }
}

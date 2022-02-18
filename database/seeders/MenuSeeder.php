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
                'label' => 'Contacts',
                'url' => '/contacts',
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
                'label' => 'Locations',
                'url' => '/locations',
            ],
            [
                'label' => 'Measurements',
                'url' => '/measurements',
            ],
            [
                'label' => 'Measurement Categories',
                'url' => '/measurement_categories',
            ],
            [
                'label' => 'Menus',
                'url' => '/menus',
            ],
            [
                'label' => 'Payment Terms',
                'url' => '/payment_terms',
            ],
            [
                'label' => 'Product Categories',
                'url' => '/product_categories',
            ],
            [
                'label' => 'Sales Orders',
                'url' => '/sales_orders',
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

<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function getData()
    {
        return [
            [
                'label' => 'Addresses', // 1
                'url' => '/addresses',
            ],
            [
                'label' => 'Contacts', // 2
                'url' => '/contacts',
            ],
            [
                'label' => 'Countries', // 3
                'url' => '/countries',
            ],
            [
                'label' => 'Currencies', // 4
                'url' => '/currencies',
            ],
            [
                'label' => 'Locations', // 5
                'url' => '/locations',
            ],
            [
                'label' => 'Measurements', // 6
                'url' => '/measurements',
            ],
            [
                'label' => 'Measurement Categories', // 7
                'url' => '/measurement_categories',
            ],
            [
                'label' => 'Menus', // 8
                'url' => '/menus',
            ],
            [
                'label' => 'Operations Types', // 9
                'url' => '/operations_types',
            ],
            [
                'label' => 'Payment Terms', // 10
                'url' => '/payment_terms',
            ],
            [
                'label' => 'Product Categories', // 11
                'url' => '/product_categories',
            ],
            [
                'label' => 'Sales Orders', // 12
                'url' => '/sales_orders',
            ],
            [
                'label' => 'Products', // 13
                'url' => '/products',
            ],
            [
                'label' => 'Sequences', // 14
                'url' => '/sequences',
            ],
            [
                'label' => 'Stock Movements', // 15
                'url' => '/stock_movements',
            ],
            [
                'label' => 'Transfers', // 16
                'url' => '/transfers',
            ],
            [
                'label' => 'Users', // 17
                'url' => '/users',
            ],
            [
                'label' => 'Global Settings', // 18
                'url' => '/global_settings',
            ],
            [
                'label' => 'Warehouses', // 19
                'url' => '/warehouses',
            ],
        ];
    }

    public function run()
    {
        $data = $this->getData();
        foreach ($data as $datum) {
            Menu::create($datum);
        }
    }
}

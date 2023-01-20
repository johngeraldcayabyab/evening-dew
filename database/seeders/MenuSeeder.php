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
                'label' => 'Activity Logs',
                'url' => '/activity_log',
            ],
            [
                'label' => 'Addresses',
                'url' => '/addresses',
            ],
            [
                'label' => 'Adjustments',
                'url' => '/adjustments',
            ],
            [
                'label' => 'App Menus',
                'url' => '/app_menus',
            ],
            [
                'label' => 'Cities',
                'url' => '/cities',
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
                'label' => 'Couriers',
                'url' => '/couriers',
            ],
            [
                'label' => 'Currencies',
                'url' => '/currencies',
            ],
            [
                'label' => 'Delivery Fees',
                'url' => '/delivery_fees',
            ],
            [
                'label' => 'Home',
                'url' => '/home',
            ],
            [
                'label' => 'Locations',
                'url' => '/locations',
            ],
            [
                'label' => 'Materials',
                'url' => '/materials',
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
                'label' => 'Operations Types',
                'url' => '/operations_types',
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
                'label' => 'Regions',
                'url' => '/Regions',
            ],
            [
                'label' => 'Sales Orders',
                'url' => '/sales_orders',
            ],
            [
                'label' => 'Sales Order Lines',
                'url' => '/sales_order_lines',
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
                'label' => 'Sources',
                'url' => '/sources',
            ],
            [
                'label' => 'Stock Movements',
                'url' => '/stock_movements',
            ],
            [
                'label' => 'Transfers',
                'url' => '/transfers',
            ],
            [
                'label' => 'Users',
                'url' => '/users',
            ],
            [
                'label' => 'Global Settings',
                'url' => '/global_settings',
            ],
            [
                'label' => 'Warehouses',
                'url' => '/warehouses',
            ],

            [
                'label' => 'Shopify',
                'url' => '/shopify',
            ],
            [
                'label' => 'Manual',
                'url' => '/manual',
            ],
            [
                'label' => 'Same Day',
                'url' => '/same_day',
            ],
            [
                'label' => 'All Sales',
                'url' => '/all_sale',
            ],
            [
                'label' => 'SM North',
                'url' => '/sm_north',
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

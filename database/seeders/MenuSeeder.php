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
                'label' => 'Access Rights',
                'url' => '/access_rights',
            ],
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
                'label' => 'Banks',
                'url' => '/banks',
            ],
            [
                'label' => 'Bills',
                'url' => '/bills',
            ],
            [
                'label' => 'Bank Accounts',
                'url' => '/bank_accounts',
            ],
            [
                'label' => 'Chart Of Accounts',
                'url' => '/chart_of_accounts',
            ],
            [
                'label' => 'Cities',
                'url' => '/cities',
            ],
            [
                'label' => 'Companies',
                'url' => '/companies',
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
                'label' => 'Groups',
                'url' => '/groups',
            ],
            [
                'label' => 'Invoices',
                'url' => '/invoices',
            ],
            [
                'label' => 'Journals',
                'url' => '/journals',
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
                'label' => 'Options',
                'url' => '/options',
            ],
            [
                'label' => 'Payments',
                'url' => '/payments',
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
                'label' => 'Purchases',
                'url' => '/purchases',
            ],
            [
                'label' => 'Purchase Settings',
                'menu_key' => '/purchase_settings',
            ],
            [
                'label' => 'Regions',
                'url' => '/regions',
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
                'label' => 'Sales Settings',
                'url' => '/sales_settings',
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
                'label' => 'Stock Location Quantity',
                'url' => '/stock_location_quantity',
            ],
            [
                'label' => 'Stock Movements',
                'url' => '/stock_movements',
            ],
            [
                'label' => 'Taxes',
                'url' => '/taxes',
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
                'label' => 'Warehouses',
                'url' => '/warehouses',
            ],
            [
                'label' => 'Pricelists',
                'url' => '/pricelists',
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

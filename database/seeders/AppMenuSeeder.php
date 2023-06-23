<?php

namespace Database\Seeders;

use App\Models\AppMenu;
use Illuminate\Database\Seeder;

class AppMenuSeeder extends Seeder
{
    public $depthCount = 0;
    public $loopCount = 0;

    public function run()
    {
        $this->seedChild([
            [
                'label' => 'Admin Menu',
                'children' => [
                    [
                        'label' => 'Home',
                        'menu_key' => 'Home',
                        'children' => [
                            [
                                'label' => 'Home',
                                'menu_key' => 'Home',
                            ],
                        ],
                    ],
                    [
                        'label' => 'Contacts',
                        'menu_key' => 'Contacts',
                        'children' => [
                            [
                                'label' => 'Contacts',
                                'menu_key' => 'Contacts',
                            ],
                            [
                                'label' => 'Addresses',
                                'menu_key' => 'Addresses',
                            ],
                            [
                                'label' => 'Configurations',
                                'children' => [
                                    [
                                        'label' => 'Countries',
                                        'menu_key' => 'Countries',
                                    ],
                                    [
                                        'label' => 'Cities',
                                        'menu_key' => 'Cities',
                                    ],
                                    [
                                        'label' => 'Regions',
                                        'menu_key' => 'Regions',
                                    ],
                                    [
                                        'label' => 'Banks',
                                        'menu_key' => 'Banks',
                                    ],
                                    [
                                        'label' => 'Bank Accounts',
                                        'menu_key' => 'Bank Accounts',
                                    ],
                                ]
                            ],
                        ],
                    ],
                    [
                        'label' => 'Inventory',
                        'menu_key' => 'Transfers',
                        'children' => [
                            [
                                'label' => 'Operations',
                                'children' => [
                                    [
                                        'label' => 'Transfers',
                                        'menu_key' => 'Transfers',
                                    ],
                                    [
                                        'label' => 'Adjustments',
                                        'menu_key' => 'Adjustments',
                                    ],
                                ],
                            ],
                            [
                                'label' => 'Reporting',
                                'children' => [
                                    [
                                        'label' => 'Stock Location Quantity',
                                        'menu_key' => 'Stock Location Quantity',
                                    ],
                                    [
                                        'label' => 'Stock Movements',
                                        'menu_key' => 'Stock Movements',
                                    ],
                                ],
                            ],
                            [
                                'label' => 'Master Data',
                                'children' => [
                                    [
                                        'label' => 'Products',
                                        'menu_key' => 'Products',
                                    ],
                                    [
                                        'label' => 'Materials',
                                        'menu_key' => 'Materials',
                                    ],
                                ],
                            ],
                            [
                                'label' => 'Configurations',
                                'children' => [
                                    [
                                        'label' => 'Locations',
                                        'menu_key' => 'Locations',
                                    ],
                                    [
                                        'label' => 'Measurement Categories',
                                        'menu_key' => 'Measurement Categories',
                                    ],
                                    [
                                        'label' => 'Measurements',
                                        'menu_key' => 'Measurements',
                                    ],
                                    [
                                        'label' => 'Operations Types',
                                        'menu_key' => 'Operations Types',
                                    ],
                                    [
                                        'label' => 'Product Categories',
                                        'menu_key' => 'Product Categories',
                                    ],
                                    [
                                        'label' => 'Warehouses',
                                        'menu_key' => 'Warehouses',
                                    ],
                                ],
                            ],
                        ]
                    ],
                    [
                        'label' => 'Accounting',
                        'menu_key' => 'Invoices',
                        'children' => [
                            [
                                'label' => 'Bills',
                                'menu_key' => 'Bills',
                            ],
                            [
                                'label' => 'Invoices',
                                'menu_key' => 'Invoices',
                            ],
                            [
                                'label' => 'Payments',
                                'menu_key' => 'Payments',
                            ],
                            [
                                'label' => 'Configurations',
                                'children' => [
                                    [
                                        'label' => 'Journals',
                                        'menu_key' => 'Journals',
                                    ],
                                    [
                                        'label' => 'Currencies',
                                        'menu_key' => 'Currencies',
                                    ],
                                    [
                                        'label' => 'Chart Of Accounts',
                                        'menu_key' => 'Chart Of Accounts',
                                    ],
                                ]
                            ],
                        ],
                    ],
                    [
                        'label' => 'Purchases',
                        'menu_key' => 'Purchases',
                        'children' => [
                            [
                                'label' => 'Purchases',
                                'menu_key' => 'Purchases',
                            ],
                            [
                                'label' => 'Configurations',
                                'children' => [
                                    [
                                        'label' => 'Payment Terms',
                                        'menu_key' => 'Payment Terms',
                                    ],
                                ]
                            ],
                        ],
                    ],
                    [
                        'label' => 'Sales',
                        'menu_key' => 'Sales Orders',
                        'children' => [
                            [
                                'label' => 'Sales',
                                'menu_key' => 'Sales Orders',
                            ],
                            [
                                'label' => 'Order Lines',
                                'menu_key' => 'Sales Order Lines',
                            ],
                            [
                                'label' => 'Pricelists',
                                'menu_key' => 'Pricelists',
                            ],
                            [
                                'label' => 'Configurations',
                                'children' => [
                                    [
                                        'label' => 'Payment Terms',
                                        'menu_key' => 'Payment Terms',
                                    ],
                                    [
                                        'label' => 'Delivery Fees',
                                        'menu_key' => 'Delivery Fees',
                                    ],
                                    [
                                        'label' => 'Couriers',
                                        'menu_key' => 'Couriers',
                                    ],
                                ]
                            ],
                        ],
                    ],
                    [
                        'label' => 'Settings',
                        'menu_key' => 'App Menus',
                        'children' => [
                            [
                                'label' => 'App Menus',
                                'menu_key' => 'App Menus',
                            ],
                            [
                                'label' => 'Menus',
                                'menu_key' => 'Menus',
                            ],
                            [
                                'label' => 'Sequences',
                                'menu_key' => 'Sequences',
                            ],
                            [
                                'label' => 'Sources',
                                'menu_key' => 'Sources',
                            ],
                            [
                                'label' => 'Activity Logs',
                                'menu_key' => 'Activity Logs',
                            ],
                            [
                                'label' => 'Users',
                                'menu_key' => 'Users',
                            ],
                            [
                                'label' => 'Companies',
                                'menu_key' => 'Companies',
                            ],
                            [
                                'label' => 'Groups',
                                'menu_key' => 'Groups',
                            ],
                            [
                                'label' => 'Access Rights',
                                'menu_key' => 'Access Rights',
                            ],
                        ],
                    ],
                ],
            ],
        ]);
    }

    public function seedChild($data, $appMenu = null)
    {
        $children = [];
        $parentAppMenu = [];
        foreach ($data as $datum) {
            if (isset($datum['menu_key']) && $datum['menu_key']) {
                $datum['menu_id'] = $this->getKeyId($datum['menu_key']);
                unset($datum['menu_key']);
            } else {
                $datum['menu_id'] = null;
            }
            if ($appMenu) {
                $datum['parent_app_menu_id'] = $appMenu->id;
            } else {
                $datum['parent_app_menu_id'] = null;
            }
            if (isset($datum['children'])) {
                $children[] = $datum['children'];
                unset($datum['children']);
                $parentAppMenu[] = AppMenu::create($datum);
            } else {
                AppMenu::create($datum);
            }
        }
        if (count($children)) {
            foreach ($children as $key => $child) {
                $this->seedChild($child, $parentAppMenu[$key]);
            }
        }
    }

    public function getKeyId($value)
    {
        $menus = (new MenuSeeder())->getData();
        foreach ($menus as $key => $menu) {
            if ($menu['label'] === $value) {
                return $key + 1;
            }
        }
        return false;
    }
}

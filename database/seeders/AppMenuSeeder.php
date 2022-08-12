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
                        'label' => 'Global Settings',
                        'menu_key' => 'Global Settings',
                        'children' => [
                            [
                                'label' => 'Global Settings',
                                'menu_key' => 'Global Settings',
                            ],
                            [
                                'label' => 'App Menus',
                                'menu_key' => 'App Menus',
                            ],
                            [
                                'label' => 'Menus',
                                'menu_key' => 'Menus',
                            ],
                            [
                                'label' => 'Currencies',
                                'menu_key' => 'Currencies',
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

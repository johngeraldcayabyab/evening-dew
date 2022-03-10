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
                        'label' => 'Contacts',
                        'menu_key' => 'Contacts',
                        'children' => [
                            [
                                'label' => 'Contacts',
                                'menu_key' => 'Contacts',
                            ],
                            [
                                'label' => 'Configurations',
                                'children' => [
                                    [
                                        'label' => 'Countries',
                                        'menu_key' => 'Countries',
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
                                'label' => 'Reporting',
                                'children' => [
                                    [
                                        'label' => 'Stock Movements',
                                        'menu_key' => 'Stock Movements',
                                    ],
                                ],
                            ],
                            [
                                'label' => 'Configurations',
                                'children' => [
                                    [
                                        'label' => 'Warehouses',
                                        'menu_key' => 'Warehouses',
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
                                        'label' => 'Measurement Categories',
                                        'menu_key' => 'Measurement Categories',
                                    ],
                                    [
                                        'label' => 'Measurements',
                                        'menu_key' => 'Measurements',
                                    ],
                                ],
                            ],
                        ]
                    ],
                    [
                        'label' => 'Sales',
                        'menu_key' => 'Sales Orders',
                    ],
                    [
                        'label' => 'Global Settings',
                        'menu_key' => 'Global Settings',
                    ],
                ],
            ],
        ]);
    }

    public function seedChild($data, $appMenu = null)
    {
        $children = [];
        $parentAppMenu = null;
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
                $children = $datum['children'];
                unset($datum['children']);
                $parentAppMenu = AppMenu::create($datum);
            } else {
                AppMenu::create($datum);
            }
        }
        if (count($children)) {
            $this->seedChild($children, $parentAppMenu);
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

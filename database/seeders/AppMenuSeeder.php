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
                'is_view' => false,
                'menu_id' => null,
                'children' => [
                    [
                        'label' => 'Contacts',
                        'is_view' => true,
                        'menu_id' => null,
                        'children' => [
                            [
                                'label' => 'Contacts',
                                'is_view' => false,
                                'menu_id' => null,
                            ],
                            [
                                'label' => 'Configurations',
                                'is_view' => true,
                                'menu_id' => null,
                                'children' => [
                                    [
                                        'label' => 'Countries',
                                        'is_view' => false,
                                        'menu_id' => null,
                                    ],
                                ]
                            ],
                        ]
                    ],
                    [
                        'label' => 'Inventory',
                        'is_view' => true,
                        'menu_id' => null,
                    ],
                    [
                        'label' => 'Sales',
                        'is_view' => true,
                        'menu_id' => null,
                    ],
                    [
                        'label' => 'Global Settings',
                        'is_view' => false,
                        'menu_id' => null,
                    ],
                ]
            ],
        ]);
    }

    public function seedChild($data, $appMenu = null)
    {
        $children = [];
        $parentAppMenu = null;
        foreach ($data as $datum) {

            if (!$datum['is_view']) {
                $datum['menu_id'] = $this->getKeyId($datum['label']);
            }
            if ($appMenu) {
                $datum['parent_menu_id'] = $appMenu->id;
            } else {
                $datum['parent_menu_id'] = null;
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

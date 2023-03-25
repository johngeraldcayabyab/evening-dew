<?php

namespace Database\Seeders;

use App\Models\GlobalSetting;
use Illuminate\Database\Seeder;

class GlobalSettingSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'inventory_auto_validate_draft' => false,
            ],
        ];
        foreach ($data as $datum) {
            GlobalSetting::create($datum);
        }
    }
}

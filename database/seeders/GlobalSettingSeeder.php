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
                'inventory_default_measurement_id' => 1,
                'inventory_default_measurement_category_id' => 1
            ],
        ];
        foreach ($data as $datum) {
            GlobalSetting::create($datum);
        }
    }
}

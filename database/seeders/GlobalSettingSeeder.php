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
                'inventory_default_measurement_category_id' => 1,
                'inventory_default_purchase_measurement_id' => 1,
                'inventory_default_sales_measurement_id' => 1,
                'inventory_default_product_category_id' => 1,
                'accounting_default_currency_id' => 1,
                'general_default_country_id' => 1,
            ],
        ];
        foreach ($data as $datum) {
            GlobalSetting::create($datum);
        }
    }
}

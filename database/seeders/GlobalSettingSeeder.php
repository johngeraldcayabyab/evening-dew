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
                'inventory_default_customer_location_id' => 3,
                'inventory_default_vendor_location_id' => 4,
                'inventory_default_inventory_adjustment_id' => 5,
                'inventory_default_production_id' => 6,
                'inventory_default_scrap_id' => 7,
                'inventory_default_warehouse_id' => 1,
                'inventory_auto_validate_draft' => false,
                'accounting_default_currency_id' => 1,
                'general_default_country_id' => 1,
                'sales_order_default_sequence_id' => 1,
            ],
        ];
        foreach ($data as $datum) {
            GlobalSetting::create($datum);
        }
    }
}

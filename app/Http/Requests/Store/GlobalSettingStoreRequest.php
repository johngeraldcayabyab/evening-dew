<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class GlobalSettingStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'inventory_default_measurement_category_id' => ['nullable', "exists:measurement_categories,id"],
            'inventory_default_measurement_id' => ['nullable', "exists:measurements,id"],
            'inventory_default_purchase_measurement_id' => ['nullable', "exists:measurements,id"],
            'inventory_default_sales_measurement_id' => ['nullable', "exists:measurements,id"],
            'inventory_default_product_category_id' => ['nullable', "exists:product_categories,id"],
            'inventory_default_customer_location_id' => ['nullable', "exists:locations,id"],
            'inventory_default_vendor_location_id' => ['nullable', "exists:locations,id"],
            'inventory_default_inventory_adjustment_id' => ['nullable', "exists:locations,id"],
            'inventory_default_production_id' => ['nullable', "exists:locations,id"],
            'inventory_default_scrap_id' => ['nullable', "exists:locations,id"],
            'inventory_default_warehouse_id' => ['nullable', "exists:warehouses,id"],
            'inventory_auto_validate_draft' => ['nullable', 'boolean'],
            'accounting_default_currency_id' => ['nullable', "exists:currencies,id"],
            'general_default_country_id' => ['nullable', "exists:countries,id"],
            'sales_order_default_sequence_id' => ['nullable', "exists:sequences,id"],
            'adjustment_default_sequence_id' => ['nullable', "exists:sequences,id"]
        ];
    }
}

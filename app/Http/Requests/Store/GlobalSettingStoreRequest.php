<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class GlobalSettingStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'inventory_default_measurement_category_id' => ['required', "exists:measurement_categories,id"],
            'inventory_default_measurement_id' => ['required', "exists:measurements,id"],
            'inventory_default_purchase_measurement_id' => ['required', "exists:measurements,id"],
            'inventory_default_sales_measurement_id' => ['required', "exists:measurements,id"],
            'inventory_default_product_category_id' => ['required', "exists:product_categories,id"],
            'inventory_default_customer_location_id' => ['required', "exists:locations,id"],
            'inventory_default_vendor_location_id' => ['required', "exists:locations,id"],
            'inventory_default_inventory_adjustment_id' => ['required', "exists:locations,id"],
            'inventory_default_production_id' => ['required', "exists:locations,id"],
            'inventory_default_scrap_id' => ['required', "exists:locations,id"],
            'accounting_default_currency_id' => ['required', "exists:currencies,id"],
            'general_default_country_id' => ['required', "exists:countries,id"],
            'sales_order_default_sequence_id' => ['nullable', "exists:sequences,id"],
        ];
    }
}

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
        ];
    }
}

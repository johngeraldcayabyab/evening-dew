<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GlobalSettingRequest extends FormRequest
{
    public function rules()
    {
        return [
            'inventory_default_purchase_measurement_id' => ['nullable', "exists:measurements,id"],
            'inventory_default_sales_measurement_id' => ['nullable', "exists:measurements,id"],
            'inventory_auto_validate_draft' => ['nullable', 'boolean'],
            'inventory_compute_product_quantity' => ['nullable', 'boolean'],
            'general_clickable_row' => ['nullable', "boolean"],
        ];
    }
}

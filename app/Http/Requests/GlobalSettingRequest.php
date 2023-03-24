<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GlobalSettingRequest extends FormRequest
{
    public function rules()
    {
        return [
            'inventory_auto_validate_draft' => ['nullable', 'boolean'],
            'inventory_compute_product_quantity' => ['nullable', 'boolean'],
            'general_clickable_row' => ['nullable', "boolean"],
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PricelistRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'nullable',
            'name' => 'required',
            'customer_products.*.product_id' => ['required', 'numeric','distinct'],
            'customer_products.*.unit_price' => ['required', 'numeric']
        ];
    }
}

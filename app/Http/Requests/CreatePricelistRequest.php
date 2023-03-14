<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePricelistRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'customer_products.*.product_id' => ['required', 'numeric'],
            'customer_products.*.customer_id' => ['required', 'numeric'],
            'customer_products.*.unit_price' => ['required', 'numeric'],
        ];
    }
}

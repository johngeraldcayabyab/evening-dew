<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeliveryFeeRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'is_enabled' => ['required', "boolean"],
            'product_id' => ['required', "exists:products,id"],
            'delivery_fee_lines.*.id' => ['nullable', 'exists:delivery_fee_lines,id'],
            'delivery_fee_lines.*.city_id' => ['required', "exists:cities,id"],
            'delivery_fee_lines.*.fee' => ['nullable'],
            'delivery_fee_lines_deleted.*.id' => ['nullable', 'exists:delivery_fee_lines,id'],
        ];
    }
}

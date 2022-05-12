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
        ];
    }
}

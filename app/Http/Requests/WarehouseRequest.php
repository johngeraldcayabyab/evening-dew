<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WarehouseRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'short_name' => ['required'],
            'manufacture_to_resupply' => ['nullable'],
            'buy_to_resupply' => ['nullable'],
        ];
    }
}

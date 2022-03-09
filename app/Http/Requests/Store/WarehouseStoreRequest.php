<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class WarehouseStoreRequest extends FormRequest
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

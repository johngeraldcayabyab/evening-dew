<?php

namespace App\Http\Requests\Store;

use App\Models\Currency;
use Illuminate\Foundation\Http\FormRequest;

class CurrencyStoreRequest extends FormRequest
{
    public function rules()
    {
        $symbolPositions = implode(',', Currency::getSymbolPositions());
        return [
            'currency' => ['required'],
            'name' => ['nullable'],
            'unit' => ['nullable'],
            'sub_unit' => ['nullable'],
            'rounding_factor' => ['required'],
            'decimal_places' => ['required'],
            'symbol' => ['required'],
            'symbol_position' => ['required', "in:$symbolPositions"],
        ];
    }
}

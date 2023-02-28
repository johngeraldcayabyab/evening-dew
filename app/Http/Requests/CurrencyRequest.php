<?php

namespace App\Http\Requests;

use App\Models\Currency;
use Illuminate\Foundation\Http\FormRequest;

class CurrencyRequest extends FormRequest
{
    public function rules()
    {
        $symbolPositions = implode_types(Currency::getSymbolPositions());
        return [
            'currency' => ['required'],
            'name' => ['nullable'],
            'unit' => ['nullable'],
            'sub_unit' => ['nullable'],
            'rounding_factor' => ['required', 'numeric'],
            'decimal_places' => ['required'],
            'symbol' => ['required'],
            'symbol_position' => ['required', "in:$symbolPositions"],
        ];
    }
}

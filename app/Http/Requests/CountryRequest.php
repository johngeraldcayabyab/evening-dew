<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CountryRequest extends FormRequest
{
    public function rules()
    {
        return [
            'country_name' => ['required'],
            'currency_id' => ['nullable', "exists:currencies,id"],
            'country_code' => ['nullable'],
            'country_calling_code' => ['nullable'],
            'vat_label' => ['nullable'],
            'is_default' => ['nullable', 'boolean'],
        ];
    }
}

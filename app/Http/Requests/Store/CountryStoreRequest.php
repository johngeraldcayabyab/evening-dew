<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class CountryStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'country_name' => ['required'],
            'currency_id' => ['required', "exists:currencies,id"],
            'country_code' => ['nullable'],
            'country_calling_code' => ['nullable'],
            'vat_label' => ['nullable'],
        ];
    }
}

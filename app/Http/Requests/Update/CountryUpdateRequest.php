<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class CountryUpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'country_name' => ['required'],
            'currency_id' => ['nullable', "exists:currencies,id"],
            'country_code' => ['nullable'],
            'country_calling_code' => ['nullable'],
            'vat_label' => ['nullable'],
        ];
    }
}

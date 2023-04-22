<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'phone' => ['nullable'],
            'mobile' => ['nullable'],
            'email' => ['nullable'],
            'website' => ['nullable'],
            'tax_id' => ['nullable'],
            'pricelist_id' => ['nullable'],
            'avatar' => ['nullable'],
            'address' => ['nullable'],
            'zip' => ['nullable'],
            'country_id' => ['nullable', "exists:countries,id"],
            'city_id' => ['nullable', "exists:cities,id"],
        ];
    }
}

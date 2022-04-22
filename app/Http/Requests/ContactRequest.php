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
            'avatar' => ['nullable'],
            'street_one' => ['nullable'],
            'street_two' => ['nullable'],
            'city' => ['nullable'],
            'zip' => ['nullable'],
            'country_id' => ['nullable', "exists:countries,id"],
            'region_id' => ['nullable', "exists:regions,id"],
        ];
    }
}

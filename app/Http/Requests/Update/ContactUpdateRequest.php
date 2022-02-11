<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class ContactUpdateRequest extends FormRequest
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

            'street_1' => ['nullable'],
            'street_2' => ['nullable'],
            'city' => ['nullable'],
            'state' => ['nullable'],
            'zip' => ['nullable'],
            'country_id' => ['nullable', "exists:countries,id"],
        ];
    }
}

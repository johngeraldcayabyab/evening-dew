<?php

namespace App\Http\Requests\Update;

use App\Models\Address;
use Illuminate\Foundation\Http\FormRequest;

class AddressUpdateRequest extends FormRequest
{
    public function rules()
    {
        $types = implode(',', Address::getTypes());
        return [
            'address_name' => ['required'],
            'street_1' => ['nullable'],
            'street_2' => ['nullable'],
            'city' => ['nullable'],
            'state' => ['nullable'],
            'zip' => ['nullable'],
            'country_id' => ['nullable', "exists:countries,id"],
            'contact_id' => ['required', "exists:contacts,id"],
            'type' => ['required', "in:$types"],
        ];
    }
}

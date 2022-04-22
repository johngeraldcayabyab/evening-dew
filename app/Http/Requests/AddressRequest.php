<?php

namespace App\Http\Requests;

use App\Models\Address;
use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
{
    public function rules()
    {
        $types = implode_types(Address::getTypes());
        return [
            'address_name' => ['required'],
            'street_one' => ['nullable'],
            'street_two' => ['nullable'],
            'city' => ['nullable'],
            'zip' => ['nullable'],
            'country_id' => ['nullable', "exists:countries,id"],
            'region_id' => ['nullable', "exists:regions,id"],
            'contact_id' => ['required', "exists:contacts,id"],
            'type' => ['required', "in:$types"],
        ];
    }
}

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
            'address' => ['nullable'],
            'zip' => ['nullable'],
            'country_id' => ['nullable', "exists:countries,id"],
            'city_id' => ['nullable', "exists:cities,id"],
            'contact_id' => ['required', "exists:contacts,id"],
            'type' => ['nullable', "in:$types"],
        ];
    }
}

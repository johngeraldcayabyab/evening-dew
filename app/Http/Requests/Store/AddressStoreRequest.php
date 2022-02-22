<?php

namespace App\Http\Requests\Store;

use App\Models\Address;
use Illuminate\Foundation\Http\FormRequest;

class AddressStoreRequest extends FormRequest
{
    public function rules()
    {
        $types = implode(',', Address::getTypes());
        return [
            'address_name' => ['required'],
            'street_one' => ['nullable'],
            'street_two' => ['nullable'],
            'city' => ['nullable'],
            'state' => ['nullable'],
            'zip' => ['nullable'],
            'country_id' => ['nullable', "exists:countries,id"],
            'contact_id' => ['required', "exists:contacts,id"],
            'type' => ['required', "in:$types"],
        ];
    }
}

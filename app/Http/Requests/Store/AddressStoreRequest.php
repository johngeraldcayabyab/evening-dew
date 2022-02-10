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
            'street_1' => ['required'],
            'street_2' => ['required'],
            'city' => ['required'],
            'state' => ['required'],
            'zip' => ['required'],
            'country_id' => ['required', "exists:countries,id"],
            'contact_id' => ['nullable'],
            'type' => ['required', "in:$types"],
        ];
    }
}

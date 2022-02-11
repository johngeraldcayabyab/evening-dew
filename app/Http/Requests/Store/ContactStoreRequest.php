<?php

namespace App\Http\Requests\Store;

use App\Models\Address;
use Illuminate\Foundation\Http\FormRequest;

class ContactStoreRequest extends FormRequest
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
        ];
    }
}

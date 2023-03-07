<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BankRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['string', 'required'],
            'phone' => ['string', 'nullable'],
            'mobile' => ['string', 'nullable'],
            'email' => ['string', 'nullable'],
            'website' => ['string', 'nullable'],
            'tax_id' => ['string', 'nullable'],
            'bank_identifier_code' => ['string', 'nullable'],
        ];
    }
}

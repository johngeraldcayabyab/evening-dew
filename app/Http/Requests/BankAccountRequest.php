<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BankAccountRequest extends FormRequest
{
    public function rules()
    {
        return [
            'account_number' => ['string', 'required'],
            'account_holder_id' => ['nullable', "exists:contacts,id"],
            'bank_id' => ['nullable', "exists:bank,id"],
            'currency_id' => ['nullable', "exists:currency,id"],
            'account_holder_name' => ['nullable', 'string'],
        ];
    }
}

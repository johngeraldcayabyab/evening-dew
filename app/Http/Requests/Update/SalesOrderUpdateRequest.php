<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class SalesOrderUpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'number' => 'required',
            'customer_id' => ['required', "exists:contacts,id"],
            'invoice_address_id' => ['required', "exists:addresses,id"],
            'delivery_address_id' => ['required', "exists:addresses,id"],
            'payment_term_id' => ['nullable', "exists:payment_terms,id"],
        ];
    }
}

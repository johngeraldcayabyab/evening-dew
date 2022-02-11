<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class SalesOrderStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'number' => 'required',
            'customer_id' => ['required', "exists:contacts,id"],
            'invoice_address_id' => ['required', "exists:addresses,id"],
            'delivery_address_id' => ['required', "exists:addresses,id"],
            'payment_term_id' => ['required', "exists:payment_terms,id"],
        ];
    }
}

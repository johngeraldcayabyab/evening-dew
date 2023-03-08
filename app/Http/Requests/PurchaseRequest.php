<?php

namespace App\Http\Requests;

use App\Models\Purchase;
use Illuminate\Foundation\Http\FormRequest;

class PurchaseRequest extends FormRequest
{
    public function rules()
    {
        $statuses = implode_types(Purchase::getStatuses());
        return [
            'number' => ['required'],
            'vendor_id' => ['required', "exists:contacts,id"],
            'vendor_reference' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'currency_id' => ['required', "exists:currencies,id"],
            'order_deadline' => ['nullable'],
            'receipt_date' => ['nullable'],
            'purchase_representative_id' => ['nullable', 'exists:users,id'],
            'drop_ship_address_id' => ['nullable', 'exists:addresses,id'],
            'payment_term_id' => ['nullable', "exists:payment_terms,id"],
            'status' => ['nullable', "in:$statuses"],
        ];
    }
}

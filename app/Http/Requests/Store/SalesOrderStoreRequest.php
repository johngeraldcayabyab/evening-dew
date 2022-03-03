<?php

namespace App\Http\Requests\Store;

use App\Models\Transfer;
use Illuminate\Foundation\Http\FormRequest;

class SalesOrderStoreRequest extends FormRequest
{
    public function rules()
    {
        $shippingPolicies = implode(',', Transfer::getShippingPolicies());
        return [
            'number' => 'required',
            'customer_id' => ['required', "exists:contacts,id"],
            'invoice_address_id' => ['required', "exists:addresses,id"],
            'delivery_address_id' => ['required', "exists:addresses,id"],
            'expiration_date' => ['nullable'],
            'quotation_date' => ['required'],
            'payment_term_id' => ['nullable', "exists:payment_terms,id"],
            'salesperson_id' => ['nullable', 'exists:users,id'],
            'customer_reference' => ['nullable'],
            'shipping_policy' => ['nullable', "in:$shippingPolicies"],
            'expected_delivery_date' => ['nullable'],
            'source_document' => ['nullable'],
            'sales_order_lines.*.product_id' => ['required', "exists:products,id"],
            'sales_order_lines.*.description' => ['nullable'],
            'sales_order_lines.*.quantity' => ['required'],
            'sales_order_lines.*.measurement_id' => ["required", "exists:measurements,id"],
            'sales_order_lines.*.unit_price' => ['required'],
        ];
    }
}

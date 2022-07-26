<?php

namespace App\Http\Requests;

use App\Models\SalesOrder;
use App\Models\Transfer;
use Illuminate\Foundation\Http\FormRequest;

class SalesOrderRequest extends FormRequest
{
    public function rules()
    {
        $shippingPolicies = implode_types(Transfer::getShippingPolicies());
        $statuses = implode_types(SalesOrder::getStatuses());
        $shippingMethods = implode_types(Transfer::getShippingMethods());
        return [
            'number' => 'required',
            'customer_id' => ['required', "exists:contacts,id"],
            'invoice_address' => ['nullable'],
            'delivery_address' => ['nullable'],
            'invoice_city_id' => ['nullable', "exists:cities,id"],
            'delivery_city_id' => ['nullable', "exists:cities,id"],
            'invoice_phone' => ['nullable'],
            'delivery_phone' => ['nullable'],
            'expiration_date' => ['nullable'],
            'quotation_date' => ['required'],
            'courier_id' => ['nullable', "exists:couriers,id"],
            'payment_term_id' => ['nullable', "exists:payment_terms,id"],
            'salesperson_id' => ['nullable', 'exists:users,id'],
            'source_id' => ['nullable', 'exists:sources,id'],
            'customer_reference' => ['nullable'],
            'shipping_policy' => ['nullable', "in:$shippingPolicies"],
            'shipping_date' => ['nullable'],
            'source_document' => ['nullable'],
            'status' => ['nullable', "in:$statuses"],
            'notes' => ['nullable'],
            'shipping_method' => ['nullable', "in:$shippingMethods"],
            'sales_order_lines.*.id' => ['nullable', 'exists:sales_order_lines,id'],
            'sales_order_lines.*.product_id' => ['required', "exists:products,id"],
            'sales_order_lines.*.description' => ['nullable'],
            'sales_order_lines.*.quantity' => ['required'],
            'sales_order_lines.*.measurement_id' => ["nullable", "exists:measurements,id"],
            'sales_order_lines.*.unit_price' => ['required'],
            'sales_order_lines_deleted.*.id' => ['nullable', 'exists:sales_order_lines,id'],
        ];
    }
}

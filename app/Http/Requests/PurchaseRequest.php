<?php

namespace App\Http\Requests;

use App\Models\Purchase;
use App\Rules\PurchaseSameMeasurementCategory;
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
            'purchase_lines.*.id' => ['nullable', 'exists:purchase_lines,id'],
            'purchase_lines.*.product_id' => ['required', "exists:products,id"],
            'purchase_lines.*.description' => ['nullable'],
            'purchase_lines.*.quantity' => ['required', 'numeric'],
            'purchase_lines.*.measurement_id' => ["nullable", "exists:measurements,id", new PurchaseSameMeasurementCategory],
            'purchase_lines.*.unit_price' => ['required', 'numeric'],
            'purchase_lines.*.receiving_date' => ['nullable'],
            'purchase_lines_deleted.*.id' => ['nullable', 'exists:purchase_lines,id'],
        ];
    }
}

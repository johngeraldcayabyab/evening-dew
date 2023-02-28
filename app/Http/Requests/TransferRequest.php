<?php

namespace App\Http\Requests;

use App\Models\Transfer;
use Illuminate\Foundation\Http\FormRequest;

class TransferRequest extends FormRequest
{
    public function rules()
    {
        $shippingPolicies = implode_types(Transfer::getShippingPolicies());
        $statuses = implode_types(Transfer::getStatuses());
        $shippingMethods = implode_types(Transfer::getShippingMethods());
        return [
            'reference' => ['nullable'],
            'contact_id' => ['nullable', 'exists:contacts,id'],
            'operation_type_id' => ['required', 'exists:operations_types,id'],
            'source_location_id' => ['nullable', 'exists:locations,id'],
            'destination_location_id' => ['nullable', 'exists:locations,id'],
            'scheduled_date' => ['required'],
            'source_document' => ['nullable'],
            'tracking_reference' => ['nullable'],
            'weight' => ['nullable', 'numeric'],
            'weight_for_shipping' => ['nullable', 'numeric'],
            'shipping_policy' => ['nullable', "in:$shippingPolicies"],
            'responsible_id' => ['nullable', 'exists:users,id'],
            'note' => ['nullable'],
            'status' => ['nullable', "in:$statuses"],
            'shipping_method' => ['nullable', "in:$shippingMethods"],
            'transfer_lines.*.id' => ['nullable', 'exists:transfer_lines,id'],
            'transfer_lines.*.product_id' => ['required', "exists:products,id"],
            'transfer_lines.*.description' => ['nullable'],
            'transfer_lines.*.demand' => ['required', 'numeric'],
            'transfer_lines.*.measurement_id' => ["required", "exists:measurements,id"],
            'transfer_lines_deleted.*.id' => ['nullable', 'exists:transfer_lines,id'],
        ];
    }
}

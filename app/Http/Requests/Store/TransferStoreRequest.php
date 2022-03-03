<?php

namespace App\Http\Requests\Store;

use App\Models\Transfer;
use Illuminate\Foundation\Http\FormRequest;

class TransferStoreRequest extends FormRequest
{
    public function rules()
    {
        $shippingPolicies = implode(',', Transfer::getShippingPolicies());
        $statuses = implode(',', Transfer::getStatuses());
        return [
            'reference' => ['nullable'],
            'contact_id' => ['nullable', 'exists:contacts,id'],
            'operation_type_id' => ['required', 'exists:operations_types,id'],
            'source_location_id' => ['nullable', 'exists:locations,id'],
            'destination_location_id' => ['nullable', 'exists:locations,id'],
            'scheduled_date' => ['required'],
            'source_document' => ['nullable'],
            'tracking_reference' => ['nullable'],
            'weight' => ['nullable'],
            'weight_for_shipping' => ['nullable'],
            'shipping_policy' => ['nullable', "in:$shippingPolicies"],
            'responsible_id' => ['nullable', 'exists:users,id'],
            'note' => ['nullable'],
            'status' => ['nullable', "in:$statuses"],
            'transfer_lines.*.product_id' => ['required', "exists:products,id"],
            'transfer_lines.*.description' => ['nullable'],
            'transfer_lines.*.demand' => ['required'],
            'transfer_lines.*.measurement_id' => ["required", "exists:measurements,id"],
        ];
    }
}

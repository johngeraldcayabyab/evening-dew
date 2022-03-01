<?php

namespace App\Http\Requests\Update;

use App\Models\Transfer;
use Illuminate\Foundation\Http\FormRequest;

class TransferUpdateRequest extends FormRequest
{
    public function rules()
    {
        $shippingPolicies = implode(',', Transfer::getShippingPolicies());
        return [
            'contact_id' => 'nullable',
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
            'note' => ['nullable']
        ];
    }
}
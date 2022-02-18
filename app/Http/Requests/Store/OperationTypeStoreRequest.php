<?php

namespace App\Http\Requests\Store;

use App\Models\OperationType;
use Illuminate\Foundation\Http\FormRequest;

class OperationTypeStoreRequest extends FormRequest
{
    public function rules()
    {
        $reservationMethods = implode(',', OperationType::getReservationMethods());
        $types = implode(',', OperationType::getTypes());
        return [
            'name' => ['required'],
            'reference_sequence_id' => ['nullable', 'exists:sequences,id'],
            'code' => ['required'],
            'warehouse_id' => ['nullable', 'exists:warehouses,id'],
            'reservation_method' => ['required', "in:$reservationMethods"],
            'type' => ['required', "in:$types"],
            'operation_type_for_returns_id' => ['nullable', 'exists:operations_types,id'],
            'show_detailed_operation' => ['nullable'],
            'pre_fill_detailed_operation' => ['nullable'],
            'reservation_days_before' => ['nullable'],
            'reservation_days_before_priority' => ['nullable'],
            'create_new_lots_serial_numbers' => ['nullable'],
            'use_existing_lots_serial_numbers' => ['nullable'],
            'default_source_location_id' => ['nullable', 'exists:locations,id'],
            'default_destination_location_id' => ['nullable', 'exists:locations,id'],
        ];
    }
}

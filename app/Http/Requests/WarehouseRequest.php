<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WarehouseRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'short_name' => ['required'],
            'manufacture_to_resupply' => ['nullable'],
            'buy_to_resupply' => ['nullable'],
            'view_location_id' => ['nullable', 'exists:locations,id'],
            'stock_location_id' => ['nullable', 'exists:locations,id'],
            'input_location_id' => ['nullable', 'exists:locations,id'],
            'quality_control_location_id' => ['nullable', 'exists:locations,id'],
            'packing_location_id' => ['nullable', 'exists:locations,id'],
            'output_location_id' => ['nullable', 'exists:locations,id'],
            'stock_after_manufacturing_location_id' => ['nullable', 'exists:locations,id'],
            'picking_before_manufacturing_location_id' => ['nullable', 'exists:locations,id'],
            'adjustment_location_id' => ['nullable', 'exists:locations,id'],
            'in_type_id' => ['nullable', 'exists:operations_types,id'],
            'internal_type_id' => ['nullable', 'exists:operations_types,id'],
            'pick_type_id' => ['nullable', 'exists:operations_types,id'],
            'pack_type_id' => ['nullable', 'exists:operations_types,id'],
            'out_type_id' => ['nullable', 'exists:operations_types,id'],
            'stock_after_manufacturing_operation_type_id' => ['nullable', 'exists:operations_types,id'],
            'picking_before_manufacturing_operation_type_id' => ['nullable', 'exists:operations_types,id'],
            'manufacturing_operation_type_id' => ['nullable', 'exists:operations_types,id'],
            'adjustment_operation_type_id' => ['nullable', 'exists:operations_types,id'],
            'is_default' => ['nullable', 'boolean'],
        ];
    }
}

<?php

namespace App\Http\Requests;

use App\Models\Adjustment;
use Illuminate\Foundation\Http\FormRequest;

class AdjustmentRequest extends FormRequest
{
    public function rules()
    {
        $statuses = implode_types(Adjustment::getStatuses());
        return [
            'number' => 'required',
            'product_category_id' => ['required', "exists:product_categories,id"],
            'warehouse_id' => ['required', "exists:warehouses,id"],
            'status' => ['nullable', "in:$statuses"],
            'adjustment_lines.*.id' => ['nullable', 'exists:adjustment_lines,id'],
            'adjustment_lines.*.product_id' => ['required', "exists:products,id"],
            'adjustment_lines.*.quantity_on_hand' => ['required'],
            'adjustment_lines.*.quantity_counted' => ['required'],
            'adjustment_lines.*.measurement_id' => ["required", "exists:measurements,id"],
            'adjustment_lines_deleted.*.id' => ['nullable', 'exists:adjustment_lines,id'],
        ];
    }
}

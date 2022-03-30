<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdjustmentRequest extends FormRequest
{
    public function rules()
    {
        return [
            'number' => 'required',
            'product_category_id' => ['required', "exists:product_categories,id"],



            'adjustment_lines.*.id' => ['nullable', 'exists:adjustment_lines,id'],
            'adjustment_lines.*.product_id' => ['required', "exists:products,id"],
            'adjustment_lines.*.location_id' => ['required', "exists:locations,id"],
            'adjustment_lines.*.quantity_on_hand' => ['required'],
            'adjustment_lines.*.quantity_counted' => ['required'],
            'adjustment_lines.*.measurement_id' => ["required", "exists:measurements,id"],
        ];
    }
}

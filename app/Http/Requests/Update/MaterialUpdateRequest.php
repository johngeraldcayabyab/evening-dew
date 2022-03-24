<?php

namespace App\Http\Requests\Update;

use App\Models\Material;
use Illuminate\Foundation\Http\FormRequest;

class MaterialUpdateRequest extends FormRequest
{
    public function rules()
    {
        $materialTypes = implode(',', Material::getMaterialTypes());
        $flexibleConsumptions = implode(',', Material::getFlexibleConsumptions());
        return [
            'product_id' => ['required', "exists:products,id"],
            'measurement_id' => ['required', "exists:measurements,id"],
            'reference' => ['nullable'],
            'material_type' => ['required', "in:$materialTypes"],
            'flexible_consumptions' => ['nullable', "in:$flexibleConsumptions"],
            'material_lines.*.id' => ['nullable', 'exists:material_lines,id'],
            'material_lines.*.product_id' => ['required', "exists:products,id"],
            'material_lines.*.quantity' => ['required'],
            'material_lines.*.measurement_id' => ["required", "exists:measurements,id"],
        ];
    }
}

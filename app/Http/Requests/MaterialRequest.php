<?php

namespace App\Http\Requests;

use App\Models\Material;
use Illuminate\Foundation\Http\FormRequest;

class MaterialRequest extends FormRequest
{
    public function rules()
    {
        $materialTypes = implode_types(Material::getMaterialTypes());
        $flexibleConsumptions = implode_types(Material::getFlexibleConsumptions());
        return [
            'product_id' => ['required', "exists:products,id"],
            'measurement_id' => ['required', "exists:measurements,id"],
            'reference' => ['nullable'],
            'material_type' => ['required', "in:$materialTypes"],
            'flexible_consumption' => ['nullable', "in:$flexibleConsumptions"],


            'material_lines.*.id' => ['nullable', 'exists:material_lines,id'],
            'material_lines.*.product_id' => ['required', "exists:products,id"],
            'material_lines.*.quantity' => ['required', 'numeric'],
            'material_lines.*.measurement_id' => ["required", "exists:measurements,id"],
            'material_lines_deleted.*.id' => ['nullable', 'exists:material_lines,id'],
        ];
    }
}

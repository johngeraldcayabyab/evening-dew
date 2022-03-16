<?php

namespace App\Http\Requests\Store;

use App\Models\Material;
use Illuminate\Foundation\Http\FormRequest;

class MaterialStoreRequest extends FormRequest
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
            'flexible_consumption' => ['nullable', "in:$flexibleConsumptions"],
            'material_lines.*.product_id' => ['required', "exists:products,id"],
            'material_lines.*.quantity' => ['required'],
            'material_lines.*.measurement_id' => ["required", "exists:measurements,id"],
        ];
    }
}

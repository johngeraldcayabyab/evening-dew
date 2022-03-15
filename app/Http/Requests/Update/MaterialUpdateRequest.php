<?php

namespace App\Http\Requests\Update;

use App\Models\Material;
use Illuminate\Foundation\Http\FormRequest;

class MaterialUpdateRequest extends FormRequest
{
    public function rules()
    {
        $materialTypes = implode(',', Material::getMaterialTypes());
        return [
            'product_id' => ['required', "exists:products,id"],
            'quantity' => ['required'],
            'measurement_id' => ['required', "exists:measurements,id"],
            'reference' => ['nullable'],
            'material_type' => ['required', "in:$materialTypes"],
            'transfer_lines.*.id' => ['nullable', 'exists:transfer_lines,id'],
            'transfer_lines.*.product_id' => ['required', "exists:products,id"],
            'transfer_lines.*.quantity' => ['required'],
            'transfer_lines.*.measurement_id' => ["required", "exists:measurements,id"],
        ];
    }
}

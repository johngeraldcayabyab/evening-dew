<?php

namespace App\Http\Requests\Store;

use App\Models\Material;
use Illuminate\Foundation\Http\FormRequest;

class MaterialStoreRequest extends FormRequest
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
        ];
    }
}

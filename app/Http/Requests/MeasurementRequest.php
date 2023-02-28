<?php

namespace App\Http\Requests;

use App\Models\Measurement;
use Illuminate\Foundation\Http\FormRequest;

class MeasurementRequest extends FormRequest
{
    public function rules()
    {
        $types = implode_types(Measurement::getTypes());
        $id = $this->measurement->id ?? null;
        return [
            'name' => ['required', "unique:measurements,name,{$id}"],
            'type' => ['nullable', "in:$types"],
            'ratio' => ['nullable', 'numeric'],
            'rounding_precision' => ['nullable', 'numeric'],
            'measurement_category_id' => ['nullable', "exists:measurement_categories,id"]
        ];
    }
}

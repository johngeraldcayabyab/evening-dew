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
            'type' => ['required', "in:$types"],
            'ratio' => ['required'],
            'rounding_precision' => ['required'],
            'measurement_category_id' => ['required', "exists:measurement_categories,id"]
        ];
    }
}

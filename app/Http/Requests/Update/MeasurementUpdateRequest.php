<?php

namespace App\Http\Requests\Update;

use App\Models\Measurement;
use Illuminate\Foundation\Http\FormRequest;

class MeasurementUpdateRequest extends FormRequest
{
    public function rules()
    {
        $types = implode(',', Measurement::getTypes());
        return [
            'name' => ['required', "unique:measurements,name,{$this->measurement->id}"],
            'type' => ['required', "in:$types"],
            'ratio' => ['required'],
            'rounding_precision' => ['required'],
            'measurement_category_id' => ['required', "exists:measurement_categories,id"]
        ];
    }
}

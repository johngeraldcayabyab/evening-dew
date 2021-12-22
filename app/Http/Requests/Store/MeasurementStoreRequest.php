<?php

namespace App\Http\Requests\Store;

use App\Models\Measurement;
use Illuminate\Foundation\Http\FormRequest;

class MeasurementStoreRequest extends FormRequest
{
    public function rules()
    {
        $types = implode(',', Measurement::getTypes());
        return [
            'name' => ['required', "unique:measurements,name"],
            'type' => ['required', "in:$types"],
            'ratio' => ['required'],
            'rounding_precision' => ['required'],
            'measurement_category_id' => ['required', "exists:measurement_categories,id"]
        ];
    }
}

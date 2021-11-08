<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MeasurementRequest extends FormRequest
{
    public function rules()
    {
        $uniqueName = Rule::unique('measurements');
        $model = $this->measurement;
        return [
            'name' => ['required', $model ? $uniqueName->ignore($model->id) : $uniqueName],
            'measurement_category_id' => ['required'],
            'type' => ['required'],
            'ratio' => ['required'],
            'rounding_precision' => ['required'],
        ];
    }
}

<?php

namespace App\Modules\Measurement\Requests;

use App\Modules\Measurement\Models\Measurement;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MeasurementRequest extends FormRequest
{
    public function rules()
    {
        $uniqueName = Rule::unique('measurements');
        $model = $this->measurement;
        $types = implode(',', Measurement::getTypes());
        return [
            'name' => ['required', $model ? $uniqueName->ignore($model->id) : $uniqueName],
            'type' => ['required', "in:$types"],
            'ratio' => ['required'],
            'rounding_precision' => ['required'],
        ];
    }
}

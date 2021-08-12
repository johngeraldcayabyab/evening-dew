<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MeasureCategoryRequest extends FormRequest
{
    public function rules()
    {
        $uniqueName = Rule::unique('measures_categories');
        $model = $this->measure_category;
        return [
            'name' => ['required', $model ? $uniqueName->ignore($model->id) : $uniqueName]
        ];
    }
}

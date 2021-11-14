<?php

namespace App\Modules\MeasurementCategory\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MeasurementCategoryStoreRequest extends FormRequest
{
    public function rules()
    {
        $uniqueName = Rule::unique('measurement_categories');
        $model = $this->measurement_category;
        return [
            'name' => ['required', $model ? $uniqueName->ignore($model->id) : $uniqueName]
        ];
    }
}

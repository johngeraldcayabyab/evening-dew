<?php

namespace App\Http\Requests\MeasurementCategory;

use Illuminate\Foundation\Http\FormRequest;

class MeasurementCategoryMassDestroyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids.*' => 'exists:measurement_categories,id'
        ];
    }
}

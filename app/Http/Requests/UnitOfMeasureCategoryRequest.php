<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UnitOfMeasureCategoryRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required', Rule::unique('units_of_measure_categories')]
        ];
    }
}

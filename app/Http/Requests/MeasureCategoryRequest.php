<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MeasureCategoryRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required', Rule::unique('measures_categories')]
        ];
    }
}

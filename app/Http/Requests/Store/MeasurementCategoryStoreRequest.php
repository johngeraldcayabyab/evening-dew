<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class MeasurementCategoryStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required', 'unique:measurement_categories,name']
        ];
    }
}

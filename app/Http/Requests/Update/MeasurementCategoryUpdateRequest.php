<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class MeasurementCategoryUpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required', "unique:measurement_categories,name,{$this->measurement_category->id}"]
        ];
    }
}

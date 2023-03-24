<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MeasurementCategoryRequest extends FormRequest
{
    public function rules()
    {
        $id = $this->measurement_category->id ?? null;
        return [
            'name' => ['required', "unique:measurement_categories,name,{$id}"],
            'is_default' => ['nullable', 'boolean'],
        ];
    }
}

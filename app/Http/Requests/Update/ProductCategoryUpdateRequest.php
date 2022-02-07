<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class ProductCategoryUpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'category' => 'required',
            'parent_category_id' => ['nullable', "exists:product_categories,id"],
        ];
    }
}

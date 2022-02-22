<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class ProductCategoryUpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'category' => ['required', "unique:product_categories,category,{$this->product_category->id}"],
            'parent_product_category_id' => ['nullable', "exists:product_categories,id"],
        ];
    }
}

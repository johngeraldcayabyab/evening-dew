<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCategoryRequest extends FormRequest
{
    public function rules()
    {
        $id = $this->product_category->id ?? null;
        return [
            'category' => ['required', "unique:product_categories,category,{$id}"],
            'parent_product_category_id' => ['nullable', "exists:product_categories,id"],
            'is_default' => ['nullable', 'boolean'],
        ];
    }
}

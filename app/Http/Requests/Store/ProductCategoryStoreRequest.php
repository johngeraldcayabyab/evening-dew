<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class ProductCategoryStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'category' => ['required', 'unique:product_categories,category'],
            'parent_product_category_id' => ['nullable', "exists:product_categories,id"],
        ];
    }
}

<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class ProductCategoryStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'category' => 'required',
            'parent_category_id' => ['nullable', "exists:product_categories,id"],
        ];
    }
}

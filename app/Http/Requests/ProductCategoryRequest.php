<?php

namespace App\Http\Requests;

use App\Models\ProductCategory;
use Illuminate\Foundation\Http\FormRequest;

class ProductCategoryRequest extends FormRequest
{
    public function rules()
    {
        $costingMethods = implode_types(ProductCategory::getCostingMethods());
        $id = $this->product_category->id ?? null;
        return [
            'category' => ['required', "unique:product_categories,category,{$id}"],
            'parent_product_category_id' => ['nullable', "exists:product_categories,id"],
            'is_default' => ['nullable', 'boolean'],
            'costing_method' => ['required', "in:$costingMethods"],
        ];
    }
}

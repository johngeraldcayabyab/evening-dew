<?php

namespace App\Observers;

use App\Models\ProductCategory;
use Illuminate\Validation\ValidationException;

class ProductCategoryObserver
{
    public function updating(ProductCategory $productCategory)
    {
        if ($productCategory->parent_product_category_id === $productCategory->id) {
            throw ValidationException::withMessages(['parent_product_category_id' => 'Recursion detected']);
        }
    }
}

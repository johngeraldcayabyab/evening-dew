<?php

namespace App\Observers;

use App\Models\ProductCategory;
use Illuminate\Validation\ValidationException;

class ProductCategoryObserver
{
    public function creating(ProductCategory $productCategory)
    {
        $this->defaults($productCategory);
    }

    public function updating(ProductCategory $productCategory)
    {
        if ($productCategory->parent_product_category_id === $productCategory->id) {
            throw ValidationException::withMessages(['parent_product_category_id' => 'Recursion detected']);
        }
        $this->defaults($productCategory);
    }

    public function defaults($productCategory)
    {
        if ($productCategory->is_default) {
            $currentDefault = ProductCategory::where('is_default', true)->first();
            $currentDefault->is_default = false;
            $currentDefault->save();
        }
    }
}

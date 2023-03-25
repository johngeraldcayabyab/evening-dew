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
        if (!$productCategory->is_default) {
            $currentDefault = ProductCategory::where('id', $productCategory->id)->first();
            if ($currentDefault->is_default) {
                throw ValidationException::withMessages(['is_default' => 'There should be one default']);
            }
        }
        $this->defaults($productCategory);
    }

    public function defaults($productCategory)
    {
        if ($productCategory->is_default) {
            $previousDefault = ProductCategory::where('is_default', true)
                ->where('id', '!=', $productCategory->id)
                ->first();
            if ($previousDefault) {
                $previousDefault->is_default = false;
                $previousDefault->saveQuietly();
            }
        }
    }
}

<?php

namespace App\Observers;

use App\Models\ProductCategory;
use Illuminate\Validation\ValidationException;

class ProductCategoryObserver
{
    public function created(ProductCategory $productCategory)
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
            $previousDefault = ProductCategory::where('is_default', true)
                ->where('id', '!=', $productCategory->id)
                ->first();
            if ($previousDefault) {
                $previousDefault->is_default = false;
                $previousDefault->save();
            }
        }
    }
}

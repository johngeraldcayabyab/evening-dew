<?php

namespace App\Observers;

use App\Models\ProductCategory;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ProductCategoryObserver
{
    public function creating(ProductCategory $productCategory)
    {
        if ($productCategory->parent_product_category_id) {
            $parent = ProductCategory::find($productCategory->parent_product_category_id);
            $productCategory->with_parents = Str::of($parent->with_parents)->append(" / $productCategory->category");
        } else {
            $productCategory->with_parents = $productCategory->category;
        }
    }

    public function updating(ProductCategory $productCategory)
    {
        $parent = ProductCategory::find($productCategory->parent_product_category_id);
        if ($parent) {
//            $parents = explode(' / ', $productCategory->with_parents);
            if ($productCategory->isDirty('parent_product_category_id')) {
                if ($parent->id === $productCategory->id) {
                    throw ValidationException::withMessages(['parent_product_category_id' => 'Recursion detected']);
                }
            }
//            $productCategory->with_parents = Str::of($parent->with_parents)->append(" / $productCategory->category");
        }
    }

//    public function updating(ProductCategory $productCategory)
//    {
//        $parent = ProductCategory::find($productCategory->parent_product_category_id);
//        if ($parent) {
////            $parents = explode(' / ', $productCategory->with_parents);
//            if ($productCategory->isDirty('parent_product_category_id')) {
//                if ($parent->id === $productCategory->id) {
//                    throw ValidationException::withMessages(['parent_product_category_id' => 'Recursion detected']);
//                }
//            }
////            $productCategory->with_parents = Str::of($parent->with_parents)->append(" / $productCategory->category");
//        }
//    }
}

<?php

namespace App\Routes;

use App\Http\Controllers\ProductCategoryController;
use Illuminate\Support\Facades\Route;

class ProductCategoryRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('product_categories/{product_category}/slug', [ProductCategoryController::class, 'slug'])->name('product_categories.slug');
            Route::get('product_categories/{product_category}', [ProductCategoryController::class, 'show'])->name('product_categories.show');
            Route::put('product_categories/{product_category}', [ProductCategoryController::class, 'update'])->name('product_categories.update');
            Route::delete('product_categories/{product_category}', [ProductCategoryController::class, 'destroy'])->name('product_categories.destroy');
            Route::post('product_categories/mass_destroy', [ProductCategoryController::class, 'mass_destroy'])->name('product_categories.mass_destroy');
            Route::post('product_categories', [ProductCategoryController::class, 'store'])->name('product_categories.store');
            Route::get('product_categories', [ProductCategoryController::class, 'index'])->name('product_categories.index');
        });
    }
}

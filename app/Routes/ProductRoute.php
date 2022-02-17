<?php

namespace App\Routes;

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

class ProductRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('products/initial_values', [ProductController::class, 'initial_values'])->name('products.initial_values');
            Route::get('products/option', [ProductController::class, 'option'])->name('products.option');
            Route::get('products/{product}/slug', [ProductController::class, 'slug'])->name('products.slug');
            Route::get('products/{product}', [ProductController::class, 'show'])->name('products.show');
            Route::put('products/{product}', [ProductController::class, 'update'])->name('products.update');
            Route::delete('products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
            Route::post('products/mass_destroy', [ProductController::class, 'mass_destroy'])->name('products.mass_destroy');
            Route::post('products', [ProductController::class, 'store'])->name('products.store');
            Route::get('products', [ProductController::class, 'index'])->name('products.index');
        });
    }
}

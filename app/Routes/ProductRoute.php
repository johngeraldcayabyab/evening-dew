<?php

namespace App\Routes;

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

class ProductRoute
{
    public function __construct($middleware, $prefix)
    {
        Route::middleware($middleware)->prefix($prefix)->group(function () {
            Route::get('/initial_values', [ProductController::class, 'initial_values']);
            Route::get('/{product}', [ProductController::class, 'show']);
            Route::put('/{product}', [ProductController::class, 'update']);
            Route::delete('/{product}', [ProductController::class, 'destroy']);
            Route::post('/mass_destroy', [ProductController::class, 'mass_destroy']);
            Route::post('', [ProductController::class, 'store']);
            Route::get('', [ProductController::class, 'index']);
        });
    }
}

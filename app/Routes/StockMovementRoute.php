<?php

namespace App\Routes;

use App\Http\Controllers\StockMovementController;
use Illuminate\Support\Facades\Route;

class StockMovementRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('stock_movements/initial_values', [StockMovementController::class, 'initial_values'])->name('stock_movements.initial_values');
            Route::get('stock_movements/{stock_movement}/slug', [StockMovementController::class, 'slug'])->name('stock_movements.slug');
            Route::get('stock_movements/{stock_movement}', [StockMovementController::class, 'show'])->name('stock_movements.show');
            Route::put('stock_movements/{stock_movement}', [StockMovementController::class, 'update'])->name('stock_movements.update');
            Route::delete('stock_movements/{stock_movement}', [StockMovementController::class, 'destroy'])->name('stock_movements.destroy');
            Route::post('stock_movements/mass_destroy', [StockMovementController::class, 'mass_destroy'])->name('stock_movements.mass_destroy');
            Route::post('stock_movements', [StockMovementController::class, 'store'])->name('stock_movements.store');
            Route::get('stock_movements', [StockMovementController::class, 'index'])->name('stock_movements.index');
        });
    }
}

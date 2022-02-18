<?php

namespace App\Routes;

use App\Http\Controllers\WarehouseController;
use Illuminate\Support\Facades\Route;

class WarehouseRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('warehouses/initial_values', [WarehouseController::class, 'initial_values'])->name('warehouses.initial_values');
            Route::get('warehouses/option', [WarehouseController::class, 'option'])->name('warehouses.option');
            Route::get('warehouses/{warehouse}/slug', [WarehouseController::class, 'slug'])->name('warehouses.slug');
            Route::get('warehouses/{warehouse}', [WarehouseController::class, 'show'])->name('warehouses.show');
            Route::put('warehouses/{warehouse}', [WarehouseController::class, 'update'])->name('warehouses.update');
            Route::delete('warehouses/{warehouse}', [WarehouseController::class, 'destroy'])->name('warehouses.destroy');
            Route::post('warehouses/mass_destroy', [WarehouseController::class, 'mass_destroy'])->name('warehouses.mass_destroy');
            Route::post('warehouses', [WarehouseController::class, 'store'])->name('warehouses.store');
            Route::get('warehouses', [WarehouseController::class, 'index'])->name('warehouses.index');
        });
    }
}

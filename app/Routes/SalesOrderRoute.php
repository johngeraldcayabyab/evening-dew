<?php

namespace App\Routes;

use App\Http\Controllers\SalesOrderController;
use Illuminate\Support\Facades\Route;

class SalesOrderRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('sales_orders/initial_values', [SalesOrderController::class, 'initial_values'])->name('sales_orders.initial_values');
            Route::get('sales_orders/{sales_order}/slug', [SalesOrderController::class, 'slug'])->name('sales_orders.slug');
            Route::get('sales_orders/{sales_order}', [SalesOrderController::class, 'show'])->name('sales_orders.show');
            Route::put('sales_orders/{sales_order}', [SalesOrderController::class, 'update'])->name('sales_orders.update');
            Route::delete('sales_orders/{sales_order}', [SalesOrderController::class, 'destroy'])->name('sales_orders.destroy');
            Route::post('sales_orders/mass_destroy', [SalesOrderController::class, 'mass_destroy'])->name('sales_orders.mass_destroy');
            Route::post('sales_orders', [SalesOrderController::class, 'store'])->name('sales_orders.store');
            Route::get('sales_orders', [SalesOrderController::class, 'index'])->name('sales_orders.index');
        });
    }
}

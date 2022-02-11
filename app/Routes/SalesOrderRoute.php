<?php

namespace App\Routes;

use App\Http\Controllers\SalesOrderController;
use Illuminate\Support\Facades\Route;

class SalesOrderRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('sales_order/initial_values', [SalesOrderController::class, 'initial_values'])->name('sales_order.initial_values');
            Route::get('sales_order/{sale_order}/slug', [SalesOrderController::class, 'slug'])->name('sales_order.slug');
            Route::get('sales_order/{sale_order}', [SalesOrderController::class, 'show'])->name('sales_order.show');
            Route::put('sales_order/{sale_order}', [SalesOrderController::class, 'update'])->name('sales_order.update');
            Route::delete('sales_order/{sale_order}', [SalesOrderController::class, 'destroy'])->name('sales_order.destroy');
            Route::post('sales_order/mass_destroy', [SalesOrderController::class, 'mass_destroy'])->name('sales_order.mass_destroy');
            Route::post('sales_order', [SalesOrderController::class, 'store'])->name('sales_order.store');
            Route::get('sales_order', [SalesOrderController::class, 'index'])->name('sales_order.index');
        });
    }
}

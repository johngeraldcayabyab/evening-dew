<?php

namespace App\Routes;

use App\Http\Controllers\SalesOrderController;
use Illuminate\Support\Facades\Route;

class SalesOrderRoute
{
    public function __construct($middleware, $prefix)
    {
        Route::middleware($middleware)->prefix($prefix)->group(function () {
            Route::get("/sales_per_day", [SalesOrderController::class, 'sales_per_day']);
            Route::get('/initial_values', [SalesOrderController::class, 'initial_values']);
            Route::get('/{sales_order}', [SalesOrderController::class, 'show']);
            Route::put('/{sales_order}', [SalesOrderController::class, 'update']);
            Route::delete('/{sales_order}', [SalesOrderController::class, 'destroy']);
            Route::post('/mass_destroy', [SalesOrderController::class, 'mass_destroy']);
            Route::post('', [SalesOrderController::class, 'store']);
            Route::get('', [SalesOrderController::class, 'index']);
        });
    }
}

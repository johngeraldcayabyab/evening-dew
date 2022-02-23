<?php

namespace App\Routes;

use App\Http\Controllers\SalesOrderLineController;
use Illuminate\Support\Facades\Route;

class SalesOrderLineRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('sales_order_lines/mass_destroy', [SalesOrderLineController::class, 'mass_destroy'])->name('sales_order_lines.mass_destroy');
        });
    }
}

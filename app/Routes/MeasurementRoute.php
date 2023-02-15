<?php

namespace App\Routes;

use App\Http\Controllers\MeasurementController;
use Illuminate\Support\Facades\Route;

class MeasurementRoute
{
    public function __construct($middleware, $prefix)
    {
        Route::middleware($middleware)->prefix($prefix)->group(function () {
            Route::get('/initial_values', [MeasurementController::class, 'initial_values']);
            Route::get('/{measurement}', [MeasurementController::class, 'show']);
            Route::put('/{measurement}', [MeasurementController::class, 'update']);
            Route::delete('/{measurement}', [MeasurementController::class, 'destroy']);
            Route::post('/mass_destroy', [MeasurementController::class, 'mass_destroy']);
            Route::post('', [MeasurementController::class, 'store']);
            Route::get('', [MeasurementController::class, 'index']);
        });
    }
}

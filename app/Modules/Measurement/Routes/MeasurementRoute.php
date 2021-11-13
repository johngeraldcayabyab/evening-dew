<?php

namespace App\Modules\Measurement\Routes;

use App\Modules\Measurement\Controllers\MeasurementController;
use Illuminate\Support\Facades\Route;

class MeasurementRoute
{
    public static function initialize()
    {
        Route::get('measurements/{measurement}/slug', [MeasurementController::class, 'slug']);
        Route::get('measurements/{measurement}', [MeasurementController::class, 'show']);
        Route::put('measurements/{measurement}', [MeasurementController::class, 'update']);
        Route::delete('measurements/{measurement}', [MeasurementController::class, 'destroy']);
        Route::post('measurements', [MeasurementController::class, 'store']);
        Route::get('measurements', [MeasurementController::class, 'index']);
    }
}

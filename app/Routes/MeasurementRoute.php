<?php

namespace App\Routes;

use App\Http\Controllers\MeasurementController;
use Illuminate\Support\Facades\Route;

class MeasurementRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('measurements/{measurement}/slug', [MeasurementController::class, 'slug'])->name('measurements.slug');
            Route::get('measurements/{measurement}', [MeasurementController::class, 'show'])->name('measurements.show');
            Route::put('measurements/{measurement}', [MeasurementController::class, 'update'])->name('measurements.update');
            Route::delete('measurements/{measurement}', [MeasurementController::class, 'destroy'])->name('measurements.destroy');
            Route::post('measurements/mass_destroy', [MeasurementController::class, 'mass_destroy'])->name('measurements.mass_destroy');
            Route::post('measurements', [MeasurementController::class, 'store'])->name('measurements.store');
            Route::get('measurements', [MeasurementController::class, 'index'])->name('measurements.index');
        });
    }
}

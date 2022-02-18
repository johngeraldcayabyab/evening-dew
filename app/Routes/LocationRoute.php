<?php

namespace App\Routes;

use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

class LocationRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('locations/initial_values', [LocationController::class, 'initial_values'])->name('locations.initial_values');
            Route::get('locations/option', [LocationController::class, 'option'])->name('locations.option');
            Route::get('locations/{location}/slug', [LocationController::class, 'slug'])->name('locations.slug');
            Route::get('locations/{location}', [LocationController::class, 'show'])->name('locations.show');
            Route::put('locations/{location}', [LocationController::class, 'update'])->name('locations.update');
            Route::delete('locations/{location}', [LocationController::class, 'destroy'])->name('locations.destroy');
            Route::post('locations/mass_destroy', [LocationController::class, 'mass_destroy'])->name('locations.mass_destroy');
            Route::post('locations', [LocationController::class, 'store'])->name('locations.store');
            Route::get('locations', [LocationController::class, 'index'])->name('locations.index');
        });
    }
}

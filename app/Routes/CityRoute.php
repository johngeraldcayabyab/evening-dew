<?php

namespace App\Routes;

use App\Http\Controllers\CityController;
use Illuminate\Support\Facades\Route;

class CityRoute
{
    public function __construct($middleware, $prefix)
    {
        Route::middleware($middleware)->prefix($prefix)->group(function () {
            Route::get('/{city}', [CityController::class, 'show']);
            Route::put('/{city}', [CityController::class, 'update']);
            Route::delete('/{city}', [CityController::class, 'destroy']);
            Route::post('/mass_destroy', [CityController::class, 'mass_destroy']);
            Route::post('', [CityController::class, 'store']);
            Route::get('', [CityController::class, 'index']);
        });
    }
}

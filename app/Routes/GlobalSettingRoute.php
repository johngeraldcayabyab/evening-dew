<?php

namespace App\Routes;

use App\Http\Controllers\GlobalSettingController;
use Illuminate\Support\Facades\Route;

class GlobalSettingRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('global_settings/initial_values', [GlobalSettingController::class, 'initial_values'])->name('global_settings.initial_values');
            Route::get('global_settings', [GlobalSettingController::class, 'show'])->name('global_settings.show');
            Route::post('global_settings', [GlobalSettingController::class, 'store'])->name('global_settings.store');
        });
    }
}

<?php

namespace App\Routes;

use App\Http\Controllers\SystemSettingController;
use Illuminate\Support\Facades\Route;

class SystemSettingRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('system_settings', [SystemSettingController::class, 'system_settings'])->name('system_settings');
        });
    }
}

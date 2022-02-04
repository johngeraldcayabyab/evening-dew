<?php

namespace App\Routes;

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

class LoginRoute
{
    public static function initialize()
    {
        Route::post('/tokens/create', [LoginController::class, 'tokensCreate'])->name('csrf');
        Route::post('/sanctum/token', [LoginController::class, 'authenticate'])->name('login');

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
        });
    }
}

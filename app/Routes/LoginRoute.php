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
    }
}
<?php

namespace App\Routes;

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

class UserRoute
{
    public function __construct($middleware, $prefix)
    {
        Route::middleware($middleware)->prefix($prefix)->group(function () {
            Route::get('/{user}', [UserController::class, 'show']);
            Route::put('/{user}', [UserController::class, 'update']);
            Route::delete('/{user}', [UserController::class, 'destroy']);
            Route::post('/mass_destroy', [UserController::class, 'mass_destroy']);
            Route::post('', [UserController::class, 'store']);
            Route::get('', [UserController::class, 'index']);
        });
    }
}

<?php

namespace App\Routes;

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

class UserRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('users/option', [UserController::class, 'option'])->name('users.option');
            Route::get('users/{user}/slug', [UserController::class, 'slug'])->name('users.slug');
            Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
            Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
            Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
            Route::post('users/mass_destroy', [UserController::class, 'mass_destroy'])->name('users.mass_destroy');
            Route::post('users', [UserController::class, 'store'])->name('users.store');
            Route::get('users', [UserController::class, 'index'])->name('users.index');
        });
    }
}

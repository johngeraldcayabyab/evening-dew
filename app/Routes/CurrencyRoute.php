<?php

namespace App\Routes;

use App\Http\Controllers\CurrencyController;
use Illuminate\Support\Facades\Route;

class CurrencyRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('currencies/initial_values', [CurrencyController::class, 'initial_values'])->name('currencies.initial_values');
            Route::get('currencies/option', [CurrencyController::class, 'option'])->name('currencies.option');
            Route::get('currencies/{currency}/slug', [CurrencyController::class, 'slug'])->name('currencies.slug');
            Route::get('currencies/{currency}', [CurrencyController::class, 'show'])->name('currencies.show');
            Route::put('currencies/{currency}', [CurrencyController::class, 'update'])->name('currencies.update');
            Route::delete('currencies/{currency}', [CurrencyController::class, 'destroy'])->name('currencies.destroy');
            Route::post('currencies/mass_destroy', [CurrencyController::class, 'mass_destroy'])->name('currencies.mass_destroy');
            Route::post('currencies', [CurrencyController::class, 'store'])->name('currencies.store');
            Route::get('currencies', [CurrencyController::class, 'index'])->name('currencies.index');
        });
    }
}

<?php

namespace App\Routes;

use App\Http\Controllers\CountryController;
use Illuminate\Support\Facades\Route;

class CountryRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('countries/option', [CountryController::class, 'option'])->name('countries.option');
            Route::get('countries/{country}/slug', [CountryController::class, 'slug'])->name('countries.slug');
            Route::get('countries/{country}', [CountryController::class, 'show'])->name('countries.show');
            Route::put('countries/{country}', [CountryController::class, 'update'])->name('countries.update');
            Route::delete('countries/{country}', [CountryController::class, 'destroy'])->name('countries.destroy');
            Route::post('countries/mass_destroy', [CountryController::class, 'mass_destroy'])->name('countries.mass_destroy');
            Route::post('countries', [CountryController::class, 'store'])->name('countries.store');
            Route::get('countries', [CountryController::class, 'index'])->name('countries.index');
        });
    }
}

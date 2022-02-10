<?php

namespace App\Routes;

use App\Http\Controllers\AddressController;
use Illuminate\Support\Facades\Route;

class AddressRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('addresses/initial_values', [AddressController::class, 'initial_values'])->name('addresses.initial_values');
            Route::get('addresses/option', [AddressController::class, 'option'])->name('addresses.option');
            Route::get('addresses/{address}/slug', [AddressController::class, 'slug'])->name('addresses.slug');
            Route::get('addresses/{address}', [AddressController::class, 'show'])->name('addresses.show');
            Route::put('addresses/{address}', [AddressController::class, 'update'])->name('addresses.update');
            Route::delete('addresses/{address}', [AddressController::class, 'destroy'])->name('addresses.destroy');
            Route::post('addresses/mass_destroy', [AddressController::class, 'mass_destroy'])->name('addresses.mass_destroy');
            Route::post('addresses', [AddressController::class, 'store'])->name('addresses.store');
            Route::get('addresses', [AddressController::class, 'index'])->name('addresses.index');
        });
    }
}

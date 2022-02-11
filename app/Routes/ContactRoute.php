<?php

namespace App\Routes;

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

class ContactRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('contacts/initial_values', [ContactController::class, 'initial_values'])->name('contacts.initial_values');
            Route::get('contacts/option', [ContactController::class, 'option'])->name('contacts.option');
            Route::get('contacts/{contact}/slug', [ContactController::class, 'slug'])->name('contacts.slug');
            Route::get('contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');
            Route::put('contacts/{contact}', [ContactController::class, 'update'])->name('contacts.update');
            Route::delete('contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
            Route::post('contacts/mass_destroy', [ContactController::class, 'mass_destroy'])->name('contacts.mass_destroy');
            Route::post('contacts', [ContactController::class, 'store'])->name('contacts.store');
            Route::get('contacts', [ContactController::class, 'index'])->name('contacts.index');
        });
    }
}

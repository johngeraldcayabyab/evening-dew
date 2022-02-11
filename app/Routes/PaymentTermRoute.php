<?php

namespace App\Routes;

use App\Http\Controllers\PaymentTermController;
use Illuminate\Support\Facades\Route;

class PaymentTermRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('payment_terms/option', [PaymentTermController::class, 'option'])->name('payment_terms.option');
            Route::get('payment_terms/{payment_term}/slug', [PaymentTermController::class, 'slug'])->name('payment_terms.slug');
            Route::get('payment_terms/{payment_term}', [PaymentTermController::class, 'show'])->name('payment_terms.show');
            Route::put('payment_terms/{payment_term}', [PaymentTermController::class, 'update'])->name('payment_terms.update');
            Route::delete('payment_terms/{payment_term}', [PaymentTermController::class, 'destroy'])->name('payment_terms.destroy');
            Route::post('payment_terms/mass_destroy', [PaymentTermController::class, 'mass_destroy'])->name('payment_terms.mass_destroy');
            Route::post('payment_terms', [PaymentTermController::class, 'store'])->name('payment_terms.store');
            Route::get('payment_terms', [PaymentTermController::class, 'index'])->name('payment_terms.index');
        });
    }
}

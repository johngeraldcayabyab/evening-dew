<?php

namespace App\Routes;

use App\Http\Controllers\SequenceController;
use Illuminate\Support\Facades\Route;

class SequenceRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('sequences/initial_values', [SequenceController::class, 'initial_values'])->name('sequences.initial_values');
            Route::get('sequences/option', [SequenceController::class, 'option'])->name('sequences.option');
            Route::get('sequences/{sequence}/slug', [SequenceController::class, 'slug'])->name('sequences.slug');
            Route::get('sequences/{sequence}', [SequenceController::class, 'show'])->name('sequences.show');
            Route::put('sequences/{sequence}', [SequenceController::class, 'update'])->name('sequences.update');
            Route::delete('sequences/{sequence}', [SequenceController::class, 'destroy'])->name('sequences.destroy');
            Route::post('sequences/mass_destroy', [SequenceController::class, 'mass_destroy'])->name('sequences.mass_destroy');
            Route::post('sequences', [SequenceController::class, 'store'])->name('sequences.store');
            Route::get('sequences', [SequenceController::class, 'index'])->name('sequences.index');
        });
    }
}

<?php

namespace App\Routes;

use App\Http\Controllers\TransferController;
use Illuminate\Support\Facades\Route;

class TransferRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('transfers/initial_values', [TransferController::class, 'initial_values'])->name('transfers.initial_values');
            Route::get('transfers/{transfer}/slug', [TransferController::class, 'slug'])->name('transfers.slug');
            Route::get('transfers/{transfer}', [TransferController::class, 'show'])->name('transfers.show');
            Route::put('transfers/{transfer}', [TransferController::class, 'update'])->name('transfers.update');
            Route::delete('transfers/{transfer}', [TransferController::class, 'destroy'])->name('transfers.destroy');
            Route::post('transfers/mass_destroy', [TransferController::class, 'mass_destroy'])->name('transfers.mass_destroy');
            Route::post('transfers', [TransferController::class, 'store'])->name('transfers.store');
            Route::get('transfers', [TransferController::class, 'index'])->name('transfers.index');
        });
    }
}

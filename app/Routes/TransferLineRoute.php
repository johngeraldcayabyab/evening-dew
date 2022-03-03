<?php

namespace App\Routes;

use App\Http\Controllers\TransferLineController;
use Illuminate\Support\Facades\Route;

class TransferLineRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('transfer_lines/mass_destroy', [TransferLineController::class, 'mass_destroy'])->name('transfer_lines.mass_destroy');
        });
    }
}

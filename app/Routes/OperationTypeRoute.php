<?php

namespace App\Routes;

use App\Http\Controllers\OperationTypeController;
use Illuminate\Support\Facades\Route;

class OperationTypeRoute
{
    public static function initialize()
    {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('operations_types/initial_values', [OperationTypeController::class, 'initial_values'])->name('operations_types.initial_values');
            Route::get('operations_types/option', [OperationTypeController::class, 'option'])->name('operations_types.option');
            Route::get('operations_types/{operation_type}/slug', [OperationTypeController::class, 'slug'])->name('operations_types.slug');
            Route::get('operations_types/{operation_type}', [OperationTypeController::class, 'show'])->name('operations_types.show');
            Route::put('operations_types/{operation_type}', [OperationTypeController::class, 'update'])->name('operations_types.update');
            Route::delete('operations_types/{operation_type}', [OperationTypeController::class, 'destroy'])->name('operations_types.destroy');
            Route::post('operations_types/mass_destroy', [OperationTypeController::class, 'mass_destroy'])->name('operations_types.mass_destroy');
            Route::post('operations_types', [OperationTypeController::class, 'store'])->name('operations_types.store');
            Route::get('operations_types', [OperationTypeController::class, 'index'])->name('operations_types.index');
        });
    }
}

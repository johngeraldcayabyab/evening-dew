<?php

namespace App\Modules\MeasurementCategory\Routes;

use App\Modules\MeasurementCategory\Controllers\MeasurementCategoryController;
use Illuminate\Support\Facades\Route;

class MeasurementCategoryRoute
{
    public static function initialize()
    {
        Route::get('measurement_categories/option', [MeasurementCategoryController::class, 'option'])->name('measurement_categories.option');
        Route::get('measurement_categories/{measurement_category}/slug', [MeasurementCategoryController::class, 'slug'])->name('measurement_categories.slug');
        Route::get('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'show'])->name('measurement_categories.show');
        Route::put('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'update'])->name('measurement_categories.update');
        Route::delete('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'destroy'])->name('measurement_categories.destroy');
        Route::post('measurement_categories', [MeasurementCategoryController::class, 'store'])->name('measurement_categories.store');
        Route::get('measurement_categories', [MeasurementCategoryController::class, 'index'])->name('measurement_categories.index');
    }
}

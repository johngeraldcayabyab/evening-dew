<?php

namespace App\Modules\MeasurementCategory\Routes;

use App\Modules\MeasurementCategory\Controllers\MeasurementCategoryController;
use Illuminate\Support\Facades\Route;

class MeasurementCategoryRoute
{
    public static function initialize()
    {
        Route::get('measurement_categories/{measurement_category}/slug', [MeasurementCategoryController::class, 'slug']);
        Route::get('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'show']);
        Route::put('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'update']);
        Route::delete('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'destroy']);
        Route::post('measurement_categories', [MeasurementCategoryController::class, 'store']);
        Route::get('measurement_categories', [MeasurementCategoryController::class, 'index']);
    }
}

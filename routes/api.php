<?php

use App\Components\RouteExtended;
use App\Http\Controllers\MeasurementCategoryController;
use App\Http\Controllers\MenuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['api', 'cors']], function () {

    Route::get('measurement_categories/{measurement_category}/slug', [MeasurementCategoryController::class, 'slug']);
    Route::get('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'show']);
    Route::post('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'store']);
    Route::put('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'update']);
    Route::delete('measurement_categories/{measurement_category}', [MeasurementCategoryController::class, 'destroy']);
    Route::get('measurement_categories', [MeasurementCategoryController::class, 'index']);

    Route::get('menus/{menu}/slug', [MenuController::class, 'slug']);
    Route::get('menus/{menu}', [MenuController::class, 'show']);
    Route::post('menus/{menu}', [MenuController::class, 'store']);
    Route::put('menus/{menu}', [MenuController::class, 'update']);
    Route::delete('menus/{menu}', [MenuController::class, 'destroy']);
    Route::get('menus', [MenuController::class, 'index']);
});

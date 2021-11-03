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
    RouteExtended::apiResource('measurement_categories', MeasurementCategoryController::class);
    Route::get('measurement_categories/{measurement_category}/slug', [MeasurementCategoryController::class, 'slug']);
    RouteExtended::apiResource('menus', MenuController::class);
    Route::get('menus/{menu}/slug', [MenuController::class, 'slug']);
});




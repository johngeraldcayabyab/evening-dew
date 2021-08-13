<?php

use App\Components\RouteExtended;
use App\Http\Controllers\MeasureCategoryController;
use App\Http\Controllers\MenuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['api', 'cors']], function () {
    RouteExtended::apiResource('measures_categories', MeasureCategoryController::class);
    RouteExtended::apiResource('menus', MenuController::class);
});




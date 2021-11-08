<?php

use App\Http\Controllers\MeasurementCategoryController;
use App\Http\Controllers\MenuController;
use App\Routes\MeasurementCategoryRoute;
use App\Routes\MeasurementRoute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['api', 'cors']], function () {
    MeasurementCategoryRoute::initialize();
    MeasurementRoute::initialize();


});

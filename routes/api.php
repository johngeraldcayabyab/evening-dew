<?php

use App\Routes\MeasurementCategoryRoute;
use App\Routes\MeasurementRoute;
use App\Routes\MenuRoute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['api', 'cors']], function () {
    MeasurementCategoryRoute::initialize();
    MeasurementRoute::initialize();
    MenuRoute::initialize();
});

<?php

use App\Modules\Measurement\Routes\MeasurementRoute;
use App\Modules\MeasurementCategory\Routes\MeasurementCategoryRoute;
use App\Modules\Menu\Routes\MenuRoute;
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

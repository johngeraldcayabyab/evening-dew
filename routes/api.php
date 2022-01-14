<?php

use App\Http\Controllers\LoginController;
use App\Routes\LoginRoute;
use App\Routes\MeasurementCategoryRoute;
use App\Routes\MeasurementRoute;
use App\Routes\MenuRoute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('password/reset', function (Request $request) {

})->name('password.reset');

Route::group(['middleware' => ['api', 'cors']], function () {
    LoginRoute::initialize();
    MeasurementCategoryRoute::initialize();
    MeasurementRoute::initialize();
    MenuRoute::initialize();
});

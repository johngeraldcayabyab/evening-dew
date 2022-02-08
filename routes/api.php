<?php

use App\Routes\GlobalSettingRoute;
use App\Routes\LoginRoute;
use App\Routes\MeasurementCategoryRoute;
use App\Routes\MeasurementRoute;
use App\Routes\MenuRoute;
use App\Routes\ProductCategoryRoute;
use App\Routes\SequenceRoute;
use App\Routes\SystemSettingRoute;
use App\Routes\UploadRoute;
use App\Routes\UserRoute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('password/reset', function (Request $request) {

})->name('password.reset');

Route::group(['middleware' => ['api', 'cors']], function () {
    GlobalSettingRoute::initialize();
    LoginRoute::initialize();
    SystemSettingRoute::initialize();
    MeasurementCategoryRoute::initialize();
    MeasurementRoute::initialize();
    MenuRoute::initialize();
    ProductCategoryRoute::initialize();
    SequenceRoute::initialize();
    UploadRoute::initialize();
    UserRoute::initialize();
});

<?php

use App\Routes\AddressRoute;
use App\Routes\CountryRoute;
use App\Routes\CurrencyRoute;
use App\Routes\GlobalSettingRoute;
use App\Routes\LoginRoute;
use App\Routes\MeasurementCategoryRoute;
use App\Routes\MeasurementRoute;
use App\Routes\MenuRoute;
use App\Routes\ProductCategoryRoute;
use App\Routes\ProductRoute;
use App\Routes\SequenceRoute;
use App\Routes\SystemSettingRoute;
use App\Routes\UploadRoute;
use App\Routes\UserRoute;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['api', 'cors']], function () {
    AddressRoute::initialize();
    CountryRoute::initialize();
    CurrencyRoute::initialize();
    GlobalSettingRoute::initialize();
    LoginRoute::initialize();
    SystemSettingRoute::initialize();
    MeasurementCategoryRoute::initialize();
    MeasurementRoute::initialize();
    MenuRoute::initialize();
    ProductCategoryRoute::initialize();
    ProductRoute::initialize();
    SequenceRoute::initialize();
    UploadRoute::initialize();
    UserRoute::initialize();
});

<?php

use App\Routes\AddressRoute;
use App\Routes\ContactRoute;
use App\Routes\CountryRoute;
use App\Routes\CurrencyRoute;
use App\Routes\GlobalSettingRoute;
use App\Routes\LocationRoute;
use App\Routes\LoginRoute;
use App\Routes\MeasurementCategoryRoute;
use App\Routes\MeasurementRoute;
use App\Routes\MenuRoute;
use App\Routes\OperationTypeRoute;
use App\Routes\PaymentTermRoute;
use App\Routes\ProductCategoryRoute;
use App\Routes\ProductRoute;
use App\Routes\SalesOrderRoute;
use App\Routes\SequenceRoute;
use App\Routes\UploadRoute;
use App\Routes\UserRoute;
use App\Routes\WarehouseRoute;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['api', 'cors']], function () {
    AddressRoute::initialize();
    ContactRoute::initialize();
    CountryRoute::initialize();
    CurrencyRoute::initialize();
    GlobalSettingRoute::initialize();
    LocationRoute::initialize();
    LoginRoute::initialize();
    MeasurementCategoryRoute::initialize();
    MeasurementRoute::initialize();
    MenuRoute::initialize();
    OperationTypeRoute::initialize();
    PaymentTermRoute::initialize();
    ProductCategoryRoute::initialize();
    SalesOrderRoute::initialize();
    ProductRoute::initialize();
    SequenceRoute::initialize();
    UploadRoute::initialize();
    UserRoute::initialize();
    WarehouseRoute::initialize();
});

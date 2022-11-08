<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\AdjustmentController;
use App\Http\Controllers\AppMenuController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\DeliveryFeeController;
use App\Http\Controllers\GlobalSettingController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MeasurementCategoryController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OperationTypeController;
use App\Http\Controllers\PaymentTermController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\SalesOrderController;
use App\Http\Controllers\SalesOrderLineController;
use App\Http\Controllers\SequenceController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserGroupController;
use App\Http\Controllers\WarehouseController;
use App\Models\Address;
use App\Models\Adjustment;
use App\Models\AppMenu;
use App\Models\City;
use App\Models\Contact;
use App\Models\Country;
use App\Models\Courier;
use App\Models\Currency;
use App\Models\DeliveryFee;
use App\Models\GlobalSetting;
use App\Models\Location;
use App\Models\Material;
use App\Models\Measurement;
use App\Models\MeasurementCategory;
use App\Models\Menu;
use App\Models\OperationType;
use App\Models\PaymentTerm;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Region;
use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use App\Models\Sequence;
use App\Models\Source;
use App\Models\StockMovement;
use App\Models\Transfer;
use App\Models\User;
use App\Models\UserGroup;
use App\Models\Warehouse;
use App\Services\RouteGenerator;
use Illuminate\Support\Facades\Route;
use Spatie\Activitylog\Models\Activity;


Route::group(['middleware' => ['api', 'cors']], function () {
    (new RouteGenerator(Activity::class))::generate(ActivityLogController::class);
    (new RouteGenerator(Address::class))::generate(AddressController::class);
    (new RouteGenerator(Adjustment::class))::generate(AdjustmentController::class);
    (new RouteGenerator(AppMenu::class))::generate(AppMenuController::class);
    (new RouteGenerator(City::class))::generate(CityController::class);
    (new RouteGenerator(Contact::class))::generate(ContactController::class);
    (new RouteGenerator(Country::class))::generate(CountryController::class);
    (new RouteGenerator(Courier::class))::generate(CourierController::class);
    (new RouteGenerator(Currency::class))::generate(CurrencyController::class);
    (new RouteGenerator(DeliveryFee::class))::generate(DeliveryFeeController::class);
    (new RouteGenerator(GlobalSetting::class))::generate(GlobalSettingController::class);
    (new RouteGenerator(Location::class))::generate(LocationController::class);
    Route::post('/tokens/create', [LoginController::class, 'tokensCreate'])->name('auth.csrf');
    Route::post('/sanctum/token', [LoginController::class, 'authenticate'])->name('auth.login');
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LoginController::class, 'logout'])->name('auth.logout');
    });
    (new RouteGenerator(Material::class))::generate(MaterialController::class);
    (new RouteGenerator(MeasurementCategory::class))::generate(MeasurementCategoryController::class);
    (new RouteGenerator(Measurement::class))::generate(MeasurementController::class);
    (new RouteGenerator(Menu::class))::generate(MenuController::class);
    (new RouteGenerator(OperationType::class))::generate(OperationTypeController::class);
    (new RouteGenerator(PaymentTerm::class))::generate(PaymentTermController::class);
    (new RouteGenerator(ProductCategory::class))::generate(ProductCategoryController::class);
    (new RouteGenerator(Region::class))::generate(RegionController::class);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get("sales_orders/sales_per_day", [SalesOrderController::class, 'sales_per_day'])->name("sales_orders.sales_per_day");
    });
    (new RouteGenerator(SalesOrder::class))::generate(SalesOrderController::class);
    (new RouteGenerator(SalesOrderLine::class))::generate(SalesOrderLineController::class);
    (new RouteGenerator(Product::class))::generate(ProductController::class);
    (new RouteGenerator(Sequence::class))::generate(SequenceController::class);
    (new RouteGenerator(Source::class))::generate(SourceController::class);
    (new RouteGenerator(StockMovement::class))::generate(StockMovementController::class);
    (new RouteGenerator(Transfer::class))::generate(TransferController::class);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('uploads/images', [UploadController::class, 'image']);
    });
    (new RouteGenerator(User::class))::generate(UserController::class);
    (new RouteGenerator(UserGroup::class))::generate(UserGroupController::class);
    (new RouteGenerator(Warehouse::class))::generate(WarehouseController::class);
});

/**
 *
 * For future use
 *
 * $dir = new DirectoryIterator(app_path() . '/Http/Controllers');
 * foreach ($dir as $fileInfo) {
 * if (!$fileInfo->isDot()) {
 * if ($fileInfo === 'LoginController.php' || $fileInfo === 'UploadController') {
 * continue;
 * }
 *
 * $controller = Str::replace('.php', '', $fileInfo);
 * $model = Str::replace('Controller', '', $controller);
 * (new RouteGenerator('App\Models\\' . $model))::generate('App\Http\Controllers\\' . $controller);
 * }
 * }
 */

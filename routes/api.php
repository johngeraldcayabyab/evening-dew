<?php

use App\Services\RouteGenerator;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['api', 'cors']], function () {
    (new RouteGenerator(\App\Models\Address::class))::generate(\App\Http\Controllers\AddressController::class);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('app_menus/{app_menu}', [\App\Http\Controllers\AppMenuController::class, 'show'])->name('app_menus.show');
    });

    (new RouteGenerator(\App\Models\Contact::class))::generate(\App\Http\Controllers\ContactController::class);
    (new RouteGenerator(\App\Models\Country::class))::generate(\App\Http\Controllers\CountryController::class);
    (new RouteGenerator(\App\Models\Currency::class))::generate(\App\Http\Controllers\CurrencyController::class);
    (new RouteGenerator(\App\Models\GlobalSetting::class))::generate(\App\Http\Controllers\GlobalSettingController::class);
    (new RouteGenerator(\App\Models\Location::class))::generate(\App\Http\Controllers\LocationController::class);
    Route::post('/tokens/create', [\App\Http\Controllers\LoginController::class, 'tokensCreate'])->name('csrf');
    Route::post('/sanctum/token', [\App\Http\Controllers\LoginController::class, 'authenticate'])->name('login');
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [\App\Http\Controllers\LoginController::class, 'logout'])->name('logout');
    });
    (new RouteGenerator(\App\Models\MeasurementCategory::class))::generate(\App\Http\Controllers\MeasurementCategoryController::class);
    (new RouteGenerator(\App\Models\Measurement::class))::generate(\App\Http\Controllers\MeasurementController::class);
    (new RouteGenerator(\App\Models\Menu::class))::generate(\App\Http\Controllers\MenuController::class);
    (new RouteGenerator(\App\Models\OperationType::class))::generate(\App\Http\Controllers\OperationTypeController::class);
    (new RouteGenerator(\App\Models\PaymentTerm::class))::generate(\App\Http\Controllers\PaymentTermController::class);
    (new RouteGenerator(\App\Models\ProductCategory::class))::generate(\App\Http\Controllers\ProductCategoryController::class);
    (new RouteGenerator(\App\Models\SalesOrder::class))::generate(\App\Http\Controllers\SalesOrderController::class);
    (new RouteGenerator(\App\Models\SalesOrderLine::class))::generate(\App\Http\Controllers\SalesOrderLineController::class);
    (new RouteGenerator(\App\Models\Product::class))::generate(\App\Http\Controllers\ProductController::class);
    (new RouteGenerator(\App\Models\Sequence::class))::generate(\App\Http\Controllers\SequenceController::class);
    (new RouteGenerator(\App\Models\StockMovement::class))::generate(\App\Http\Controllers\StockMovementController::class);
    (new RouteGenerator(\App\Models\Transfer::class))::generate(\App\Http\Controllers\TransferController::class);
    (new RouteGenerator(\App\Models\TransferLine::class))::generate(\App\Http\Controllers\TransferLineController::class);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('uploads/images', [\App\Http\Controllers\UploadController::class, 'image']);
    });
    (new RouteGenerator(\App\Models\User::class))::generate(\App\Http\Controllers\UserController::class);
    (new RouteGenerator(\App\Models\Warehouse::class))::generate(\App\Http\Controllers\WarehouseController::class);
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

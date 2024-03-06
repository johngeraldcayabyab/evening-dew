<?php

use App\Http\Controllers\AccessRightController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\AdjustmentController;
use App\Http\Controllers\AppMenuController;
use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\ChartOfAccountController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\DeliveryFeeController;
use App\Http\Controllers\GlobalSettingController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MeasurementCategoryController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OperationTypeController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentTermController;
use App\Http\Controllers\PricelistController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\PurchaseSettingController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\SalesOrderController;
use App\Http\Controllers\SalesOrderLineController;
use App\Http\Controllers\SalesSettingController;
use App\Http\Controllers\SequenceController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\StockLocationQuantityController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\TaxController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WarehouseController;
use App\Services\Router;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['api', 'cors']], function () {
    Route::post('/tokens/create', [LoginController::class, 'tokensCreate']);
    Route::post('/sanctum/token', [LoginController::class, 'authenticate']);
});

Route::group(['middleware' => ['api', 'cors', 'auth:sanctum']], function () {
    Router::generate(AccessRightController::class);
    Router::generate(ActivityLogController::class);
    Router::generate(AddressController::class);
    Router::generate(AdjustmentController::class);
    Router::generate(AppMenuController::class);
    Router::generate(BankAccountController::class);
    Router::generate(BillController::class);
    Router::generate(BankController::class);
    Router::generate(ChartOfAccountController::class);
    Router::generate(CityController::class);
    Router::generate(CompanyController::class);
    Router::generate(ContactController::class);
    Router::generate(CountryController::class);
    Router::generate(CourierController::class);
    Router::generate(CurrencyController::class);
    Router::generate(DeliveryFeeController::class);
    Route::get('global_settings', [GlobalSettingController::class, 'index'])->name('global_settings.index');
    Router::generate(GroupController::class);
    Router::generate(InvoiceController::class);
    Router::generate(JournalController::class);
    Router::generate(LocationController::class);
    Route::post('/logout', [LoginController::class, 'logout']);
    Router::generate(MaterialController::class);
    Router::generate(MeasurementCategoryController::class);
    Router::generate(MeasurementController::class);
    Router::generate(MenuController::class);
    Router::generate(OperationTypeController::class);
    Router::generate(OptionController::class);
    Router::generate(PaymentController::class);
    Router::generate(PaymentTermController::class);
    Router::generate(ProductCategoryController::class);
    Router::generate(PurchaseController::class);
    Router::generate(PurchaseSettingController::class);
    Router::generate(RegionController::class);
    Route::get("sales_orders/sales_per_day", [SalesOrderController::class, 'sales_per_day']);
    Router::generate(SalesOrderController::class);
    Router::generate(SalesOrderLineController::class);
    Router::generate(SalesSettingController::class);
    Router::generate(ProductController::class);
    Router::generate(SequenceController::class);
    Router::generate(SourceController::class);
    Route::get('/stock_location_quantity', [StockLocationQuantityController::class, 'index']);
    Router::generate(StockMovementController::class);
    Router::generate(TaxController::class);
    Router::generate(TransferController::class);
    Route::post('uploads/images', [UploadController::class, 'image']);
    Router::generate(UserController::class);
    Router::generate(WarehouseController::class);
    Router::generate(PricelistController::class);
    Route::get("pricelists/{priceListId}/products/{productId}", [PricelistController::class, 'get_pricelist_product_price']);
});

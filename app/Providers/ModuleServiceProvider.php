<?php

namespace App\Providers;

use App\Models\Address;
use App\Models\Adjustment;
use App\Models\Bill;
use App\Models\Contact;
use App\Models\Country;
use App\Models\Currency;
use App\Models\Invoice;
use App\Models\Location;
use App\Models\Material;
use App\Models\Measurement;
use App\Models\MeasurementCategory;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Purchase;
use App\Models\SalesOrder;
use App\Models\Sequence;
use App\Models\Transfer;
use App\Models\User;
use App\Models\Warehouse;
use App\Observers\AddressObserver;
use App\Observers\AdjustmentObserver;
use App\Observers\BillObserver;
use App\Observers\ContactObserver;
use App\Observers\CountryObserver;
use App\Observers\CurrencyObserver;
use App\Observers\InvoiceObserver;
use App\Observers\LocationObserver;
use App\Observers\MaterialObserver;
use App\Observers\MeasurementCategoryObserver;
use App\Observers\MeasurementObserver;
use App\Observers\ProductCategoryObserver;
use App\Observers\ProductObserver;
use App\Observers\PurchaseObserver;
use App\Observers\SalesOrderObserver;
use App\Observers\SequenceObserver;
use App\Observers\TransferObserver;
use App\Observers\UserObserver;
use App\Observers\WarehouseObserver;
use Carbon\Laravel\ServiceProvider;

class ModuleServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->observe();
    }

    private function observe()
    {
        Address::observe(AddressObserver::class);
        Adjustment::observe(AdjustmentObserver::class);
        Bill::observe(BillObserver::class);
        Contact::observe(ContactObserver::class);
        Country::observe(CountryObserver::class);
        Currency::observe(CurrencyObserver::class);
        Invoice::observe(InvoiceObserver::class);
        Location::observe(LocationObserver::class);
        Material::observe(MaterialObserver::class);
        Measurement::observe(MeasurementObserver::class);
        MeasurementCategory::observe(MeasurementCategoryObserver::class);
        ProductCategory::observe(ProductCategoryObserver::class);
        Product::observe(ProductObserver::class);
        Purchase::observe(PurchaseObserver::class);
        SalesOrder::observe(SalesOrderObserver::class);
        Sequence::observe(SequenceObserver::class);
        Transfer::observe(TransferObserver::class);
        User::observe(UserObserver::class);
        Warehouse::observe(WarehouseObserver::class);
    }
}

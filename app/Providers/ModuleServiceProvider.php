<?php

namespace App\Providers;

use App\Models\Address;
use App\Models\Adjustment;
use App\Models\Contact;
use App\Models\Location;
use App\Models\Material;
use App\Models\Measurement;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\SalesOrder;
use App\Models\Sequence;
use App\Models\Transfer;
use App\Models\User;
use App\Models\Warehouse;
use App\Observers\AddressObserver;
use App\Observers\AdjustmentObserver;
use App\Observers\ContactObserver;
use App\Observers\LocationObserver;
use App\Observers\MaterialObserver;
use App\Observers\MeasurementObserver;
use App\Observers\ProductCategoryObserver;
use App\Observers\ProductObserver;
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
        Contact::observe(ContactObserver::class);
        Location::observe(LocationObserver::class);
        Material::observe(MaterialObserver::class);
        Measurement::observe(MeasurementObserver::class);
        ProductCategory::observe(ProductCategoryObserver::class);
        Product::observe(ProductObserver::class);
        SalesOrder::observe(SalesOrderObserver::class);
        Sequence::observe(SequenceObserver::class);
        Transfer::observe(TransferObserver::class);
        User::observe(UserObserver::class);
        Warehouse::observe(WarehouseObserver::class);
    }
}

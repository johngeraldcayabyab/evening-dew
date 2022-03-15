<?php

namespace App\Providers;

use App\Models\Address;
use App\Models\Location;
use App\Models\Material;
use App\Models\ProductCategory;
use App\Models\SalesOrder;
use App\Models\Transfer;
use App\Models\User;
use App\Models\Warehouse;
use App\Observers\AddressObserver;
use App\Observers\LocationObserver;
use App\Observers\MaterialObserver;
use App\Observers\ProductCategoryObserver;
use App\Observers\SalesOrderObserver;
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
        Location::observe(LocationObserver::class);
        Material::observe(MaterialObserver::class);
        ProductCategory::observe(ProductCategoryObserver::class);
        SalesOrder::observe(SalesOrderObserver::class);
        Transfer::observe(TransferObserver::class);
        User::observe(UserObserver::class);
        Warehouse::observe(WarehouseObserver::class);
    }
}

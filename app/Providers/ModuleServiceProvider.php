<?php

namespace App\Providers;

use App\Models\Location;
use App\Models\ProductCategory;
use App\Models\SalesOrder;
use App\Models\Transfer;
use App\Models\Warehouse;
use App\Observers\LocationObserver;
use App\Observers\ProductCategoryObserver;
use App\Observers\SalesOrderObserver;
use App\Observers\TransferObserver;
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
        Location::observe(LocationObserver::class);
        ProductCategory::observe(ProductCategoryObserver::class);
        SalesOrder::observe(SalesOrderObserver::class);
        Transfer::observe(TransferObserver::class);
        Warehouse::observe(WarehouseObserver::class);
    }
}

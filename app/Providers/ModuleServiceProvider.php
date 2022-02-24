<?php

namespace App\Providers;

use App\Models\Location;
use App\Models\Measurement;
use App\Models\MeasurementCategory;
use App\Models\Menu;
use App\Models\ProductCategory;
use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use App\Models\Warehouse;
use App\Observers\LocationObserver;
use App\Observers\MeasurementCategoryObserver;
use App\Observers\MeasurementObserver;
use App\Observers\MenuObserver;
use App\Observers\ProductCategoryObserver;
use App\Observers\SalesOrderLineObserver;
use App\Observers\SalesOrderObserver;
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
        Measurement::observe(MeasurementObserver::class);
        MeasurementCategory::observe(MeasurementCategoryObserver::class);
        ProductCategory::observe(ProductCategoryObserver::class);
        Menu::observe(MenuObserver::class);
        SalesOrderLine::observe(SalesOrderLineObserver::class);
        SalesOrder::observe(SalesOrderObserver::class);
        Warehouse::observe(WarehouseObserver::class);
    }
}

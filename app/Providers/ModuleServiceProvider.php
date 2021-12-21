<?php

namespace App\Providers;

use App\Models\Measurement;
use App\Models\MeasurementCategory;
use App\Models\Menu;
use App\Observers\MeasurementCategoryObserver;
use App\Observers\MeasurementObserver;
use App\Observers\MenuObserver;
use Carbon\Laravel\ServiceProvider;

class ModuleServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->observe();
    }

    private function observe()
    {
        Measurement::observe(MeasurementObserver::class);
        MeasurementCategory::observe(MeasurementCategoryObserver::class);
        Menu::observe(MenuObserver::class);
    }
}

<?php

namespace App\Providers;

use App\Modules\Measurement\Models\Measurement;
use App\Modules\Measurement\Observers\MeasurementObserver;
use App\Modules\MeasurementCategory\Models\MeasurementCategory;
use App\Modules\MeasurementCategory\Observers\MeasurementCategoryObserver;

//use App\Modules\Menu\Models\Menu;
//use App\Modules\Menu\Observers\MenuObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    public function boot()
    {
        $this->observe();
    }

    private function observe()
    {
        $modules = [
            'MeasurementCategory',
            'Measurement',
            'Menu'
        ];

        foreach ($modules as $module) {
            $modulePath = "\\App\Modules\\$module\\";
            $modelNamespace = $modulePath . "Models\\" . $module;
            $observerNamespace = $modulePath . "Observers\\" . $module . "Observer";
            $observerNamespace = new $observerNamespace;
            $observerNamespace = get_class($observerNamespace);
            $modelNamespace::observe($observerNamespace);
        }
    }
}

<?php

namespace App\Providers;


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
        $this->migration();
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

    private function migration()
    {
        $this->loadMigrationsFrom('app/Modules/MeasurementCategory');
        $this->loadMigrationsFrom('app/Modules/Measurement');
        $this->loadMigrationsFrom('app/Modules/Menu');
    }
}

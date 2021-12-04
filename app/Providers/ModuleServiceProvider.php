<?php

namespace App\Providers;

use App\Modules\Measurement\Models\Measurement;
use App\Modules\Measurement\Observers\MeasurementObserver;
use Carbon\Laravel\ServiceProvider;

class ModuleServiceProvider extends ServiceProvider
{
    private $modules = [];

    public function boot()
    {
        $this->modules = get_modules();
        $this->observe();
        $this->migration();
    }

    private function observe()
    {
        Measurement::observe(new MeasurementObserver());
//        foreach ($this->modules as $module) {
//            $modulePath = "\\App\Modules\\$module\\";
//            $modelNamespace = $modulePath . "Models\\" . $module;
//            $observerNamespace = $modulePath . "Observers\\" . $module . "Observer";
//            $observerNamespace = new $observerNamespace;
//            $observerNamespace = get_class($observerNamespace);
//            $modelNamespace::observe($observerNamespace);
//        }
    }

    private function migration()
    {
        foreach ($this->modules as $module) {
            $this->loadMigrationsFrom("app/Modules/$module/Migrations");
        }
    }
}

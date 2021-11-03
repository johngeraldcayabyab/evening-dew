<?php

namespace App\Providers;

use App\Models\MeasurementCategory;
use App\Models\Menu;
use App\Observers\MeasurementCategoryObserver;
use App\Observers\MenuObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    public function boot()
    {
        MeasurementCategory::observe(MeasurementCategoryObserver::class);
        Menu::observe(MenuObserver::class);
    }
}

<?php

namespace App\Observers;

use App\Events\MenuEvent;
use App\Models\Menu;
use Illuminate\Support\Facades\Cache;

class MenuObserver
{
    public function created(Menu $model)
    {
        Cache::forget('menus.all');
        MenuEvent::dispatch($model, 'created');
    }

    public function updated(Menu $model)
    {
        Cache::forget('menus.all');
        MenuEvent::dispatch($model, 'updated');
    }

    public function deleted(Menu $model)
    {
        Cache::forget('menus.all');
        MenuEvent::dispatch($model, 'deleted');
    }
}

<?php

namespace App\Modules\Menu\Observers;

use App\Modules\Menu\Events\MenuEvent;
use App\Modules\Menu\Models\Menu;
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

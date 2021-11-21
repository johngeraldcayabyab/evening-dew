<?php

namespace App\Modules\Menu\Observers;

use App\Modules\Menu\Events\MenuCrudEvent;
use App\Modules\Menu\Models\Menu;
use Illuminate\Support\Facades\Cache;

class MenuObserver
{
    public function created(Menu $model)
    {
        Cache::forget('menus.all');
        MenuCrudEvent::dispatch($model, 'created');
    }

    public function updated(Menu $model)
    {
        Cache::forget('menus.all');
        MenuCrudEvent::dispatch($model, 'updated');
    }

    public function deleted(Menu $model)
    {
        Cache::forget('menus.all');
        MenuCrudEvent::dispatch($model, 'deleted');
    }
}

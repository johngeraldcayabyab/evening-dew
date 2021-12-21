<?php

namespace App\Observers;

use App\Models\Menu;
use Illuminate\Support\Facades\Cache;

class MenuObserver
{
    public function created(Menu $model)
    {
        Cache::forget('menus.all');
//        MenuCrudEvent::dispatch($model, 'created');
    }

    public function updated(Menu $model)
    {
        Cache::forget('menus.all');
//        MenuCrudEvent::dispatch($model, 'updated');
    }

    public function deleted(Menu $model)
    {
        Cache::forget('menus.all');
//        MenuCrudEvent::dispatch($model, 'deleted');
    }
}

<?php

namespace App\Observers;

use App\Events\MenuEvent;
use App\Models\Menu;
use Illuminate\Support\Facades\Redis;

class MenuObserver
{
    public function created(Menu $model)
    {
        MenuEvent::dispatch($model, 'created');
    }

    public function updated(Menu $model)
    {
        MenuEvent::dispatch($model, 'updated');
    }

    public function deleted(Menu $model)
    {
        MenuEvent::dispatch($model, 'deleted');
    }
}

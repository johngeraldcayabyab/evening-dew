<?php

namespace App\Observers;

use App\Events\UnitOfMeasureCategoryEvent;
use App\Models\UnitOfMeasureCategory;

class UnitOfMeasureCategoryObserver
{
    public function created(UnitOfMeasureCategory $model)
    {
        UnitOfMeasureCategoryEvent::dispatch($model);
    }

    public function updated(UnitOfMeasureCategory $model)
    {
        UnitOfMeasureCategoryEvent::dispatch($model);
    }

    public function deleted(UnitOfMeasureCategory $model)
    {
        UnitOfMeasureCategoryEvent::dispatch($model);
    }
}

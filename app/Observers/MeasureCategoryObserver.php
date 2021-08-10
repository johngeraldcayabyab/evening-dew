<?php

namespace App\Observers;

use App\Events\MeasureCategoryEvent;
use App\Models\MeasureCategory;

class MeasureCategoryObserver
{
    public function created(MeasureCategory $model)
    {
        MeasureCategoryEvent::dispatch($model, 'created');
    }

    public function updated(MeasureCategory $model)
    {
        MeasureCategoryEvent::dispatch($model, 'updated');
    }

    public function deleted(MeasureCategory $model)
    {
        MeasureCategoryEvent::dispatch($model, 'deleted');
    }
}

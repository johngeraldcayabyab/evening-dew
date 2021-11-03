<?php

namespace App\Observers;

use App\Events\MeasurementCategoryEvent;
use App\Models\MeasurementCategory;

class MeasurementCategoryObserver
{
    public function created(MeasurementCategory $model)
    {
        MeasurementCategoryEvent::dispatch($model, 'created');
    }

    public function updated(MeasurementCategory $model)
    {
        MeasurementCategoryEvent::dispatch($model, 'updated');
    }

    public function deleted(MeasurementCategory $model)
    {
        MeasurementCategoryEvent::dispatch($model, 'deleted');
    }
}

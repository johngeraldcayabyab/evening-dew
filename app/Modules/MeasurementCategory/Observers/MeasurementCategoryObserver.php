<?php

namespace App\Modules\MeasurementCategory\Observers;

use App\Modules\MeasurementCategory\Events\MeasurementCategoryEvent;
use App\Modules\MeasurementCategory\Models\MeasurementCategory;

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

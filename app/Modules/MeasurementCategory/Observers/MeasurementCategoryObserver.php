<?php

namespace App\Modules\MeasurementCategory\Observers;

use App\Modules\MeasurementCategory\Events\MeasurementCategoryCrudEvent;
use App\Modules\MeasurementCategory\Models\MeasurementCategory;

class MeasurementCategoryObserver
{
    public function created(MeasurementCategory $model)
    {
        MeasurementCategoryCrudEvent::dispatch($model, 'created');
    }

    public function updated(MeasurementCategory $model)
    {
        MeasurementCategoryCrudEvent::dispatch($model, 'updated');
    }

    public function deleted(MeasurementCategory $model)
    {
        MeasurementCategoryCrudEvent::dispatch($model, 'deleted');
    }
}

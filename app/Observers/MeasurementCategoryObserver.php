<?php

namespace App\Observers;


use App\Models\MeasurementCategory;

class MeasurementCategoryObserver
{
    public function created(MeasurementCategory $model)
    {
//        MeasurementCategoryCrudEvent::dispatch($model, 'created');
    }

    public function updated(MeasurementCategory $model)
    {
//        MeasurementCategoryCrudEvent::dispatch($model, 'updated');
    }

    public function deleted(MeasurementCategory $model)
    {
//        MeasurementCategoryCrudEvent::dispatch($model, 'deleted');
    }
}

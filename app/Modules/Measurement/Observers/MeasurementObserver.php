<?php

namespace App\Modules\Measurement\Observers;

use App\Modules\Measurement\Events\MeasurementCrudEvent;
use App\Modules\Measurement\Models\Measurement;

class MeasurementObserver
{
    public function created(Measurement $model)
    {
        MeasurementCrudEvent::dispatch($model, 'created');
    }

    public function updated(Measurement $model)
    {
        MeasurementCrudEvent::dispatch($model, 'updated');
    }

    public function deleted(Measurement $model)
    {
        MeasurementCrudEvent::dispatch($model, 'deleted');
    }
}

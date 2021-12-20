<?php

namespace App\Modules\Measurement\Observers;

use App\Events\MeasurementEvent;
use App\Modules\Measurement\Models\Measurement;

class MeasurementObserver
{
    public function created(Measurement $model)
    {
//        MeasurementEvent::dispatch($model, 'created');
    }

    public function updated(Measurement $model)
    {
//        MeasurementEvent::dispatch($model, 'updated');
    }

    public function deleted(Measurement $model)
    {
//        MeasurementEvent::dispatch($model, 'deleted');
    }
}

<?php

namespace App\Modules\Measurement\Observers;

use App\Events\MeasurementEvent;
use App\Modules\Measurement\Models\Measurement;

class MeasurementObserver
{
    public function created(Measurement $model)
    {
//        info('created');
//        MeasurementEvent::dispatch($model, 'created');
    }

    public function updated(Measurement $model)
    {
//        info('updated');
//        MeasurementEvent::dispatch($model, 'updated');
    }

    public function deleted(Measurement $model)
    {
//        info('deleted');
//        MeasurementEvent::dispatch($model, 'deleted');
    }
}

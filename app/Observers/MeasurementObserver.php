<?php

namespace App\Observers;

use App\Models\GlobalSetting;
use App\Models\Measurement;

class MeasurementObserver
{
    public function creating(Measurement $measurement)
    {
        $this->setDefaults($measurement);
    }

    public function updating(Measurement $measurement)
    {
        $this->setDefaults($measurement);
    }

    public function setDefaults($model)
    {
        $modelArray = $model->toArray();
        $inventoryDefaultMeasurementCategory = GlobalSetting::latestFirst()->inventoryDefaultMeasurementCategory;
        if (!isset($modelArray['type'])) {
            $model->type = Measurement::REFERENCE;
        }
        if (!isset($modelArray['ratio'])) {
            $model->ratio = Measurement::DEFAULT_RATIO;
        }
        if (!isset($modelArray['rounding_precision'])) {
            $model->rounding_precision = Measurement::DEFAULT_ROUNDING_PRECISION;
        }
        if (!isset($modelArray['measurement_category_id'])) {
            $model->measurement_category_id = $inventoryDefaultMeasurementCategory->id;
        }
    }
}

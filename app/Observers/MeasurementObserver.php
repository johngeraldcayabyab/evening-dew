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
        $inventoryDefaultMeasurementCategory = GlobalSetting::latestFirst()->inventoryDefaultMeasurementCategory;
        if (!isset($array['type'])) {
            $model->type = Measurement::REFERENCE;
        }
        if (!isset($array['ratio'])) {
            $model->ratio = Measurement::DEFAULT_RATIO;
        }
        if (!isset($array['rounding_precision'])) {
            $model->rounding_precision = Measurement::DEFAULT_ROUNDING_PRECISION;
        }
        if (!isset($array['measurement_category_id'])) {
            $model->measurement_category_id = $inventoryDefaultMeasurementCategory->id;
        }
    }
}

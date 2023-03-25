<?php

namespace App\Observers;

use App\Models\Measurement;
use App\Models\MeasurementCategory;
use Illuminate\Validation\ValidationException;

class MeasurementObserver
{
    public function creating(Measurement $measurement)
    {
        $this->setDefaults($measurement);
    }

    public function updating(Measurement $measurement)
    {
        if (!$measurement->is_default) {
            $currentDefault = Measurement::where('id', $measurement->id)->first();
            if ($currentDefault->is_default) {
                throw ValidationException::withMessages(['is_default' => 'There should be one default']);
            }
        }
        $this->setDefaults($measurement);
    }

    public function setDefaults($measurement)
    {
        $modelArray = $measurement->toArray();
        $defaultMeasurementCategory = MeasurementCategory::default();
        if (!isset($modelArray['type'])) {
            $measurement->type = Measurement::REFERENCE;
        }
        if (!isset($modelArray['ratio'])) {
            $measurement->ratio = Measurement::DEFAULT_RATIO;
        }
        if (!isset($modelArray['rounding_precision'])) {
            $measurement->rounding_precision = Measurement::DEFAULT_ROUNDING_PRECISION;
        }
        if (!isset($modelArray['measurement_category_id'])) {
            $measurement->measurement_category_id = $defaultMeasurementCategory->id;
        }
        if ($measurement->is_default) {
            $previousDefault = Measurement::where('is_default', true)
                ->where('id', '!=', $measurement->id)
                ->first();
            if ($previousDefault) {
                $previousDefault->is_default = false;
                $previousDefault->saveQuietly();
            }
        }
    }
}

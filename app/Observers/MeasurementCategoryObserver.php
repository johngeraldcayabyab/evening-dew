<?php

namespace App\Observers;

use App\Models\MeasurementCategory;
use Illuminate\Validation\ValidationException;

class MeasurementCategoryObserver
{
    public function creating(MeasurementCategory $measurementCategory)
    {
        $this->defaults($measurementCategory);
    }

    public function updating(MeasurementCategory $measurementCategory)
    {
        if (!$measurementCategory->is_default) {
            $currentDefault = MeasurementCategory::where('id', $measurementCategory->id)->first();
            if ($currentDefault->is_default) {
                throw ValidationException::withMessages(['is_default' => 'There should be one default']);
            }
        }
        $this->defaults($measurementCategory);
    }

    public function defaults($measurementCategory)
    {
        if ($measurementCategory->is_default) {
            $previousDefault = MeasurementCategory::where('is_default', true)
                ->where('id', '!=', $measurementCategory->id)
                ->first();
            if ($previousDefault) {
                $previousDefault->is_default = false;
                $previousDefault->saveQuietly();
            }
        }
    }
}

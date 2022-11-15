<?php

namespace App\Rules;

use App\Models\Measurement;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;

class SameMeasurementCategory implements Rule, DataAwareRule
{
    protected $data = [];

    public function passes($attribute, $value)
    {
        $measurementId = $this->data['measurement_id'];
        $purchaseMeasurementId = $this->data['purchase_measurement_id'];
        $salesMeasurementId = $this->data['sales_measurement_id'];
        if ($measurementId && $purchaseMeasurementId && $salesMeasurementId) {
            $measurementCategoryId = Measurement::find($measurementId)->measurement_category_id;
            $purchaseMeasurementCategoryId = Measurement::find($purchaseMeasurementId)->measurement_category_id;
            $salesMeasurementCategoryId = Measurement::find($salesMeasurementId)->measurement_category_id;
            if ($measurementCategoryId === $purchaseMeasurementCategoryId && $measurementCategoryId === $salesMeasurementCategoryId) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    public function message()
    {
        return 'Measurements should be in the same category!';
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }
}

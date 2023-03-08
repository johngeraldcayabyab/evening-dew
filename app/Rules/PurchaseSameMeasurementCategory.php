<?php

namespace App\Rules;

use App\Models\Measurement;
use App\Models\Product;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;

class PurchaseSameMeasurementCategory implements Rule, DataAwareRule
{
    protected $data = [];

    public function passes($attribute, $value)
    {
        $attributeIndex = explode('.', $attribute)[1];
        $data = $this->data['purchase_lines'][$attributeIndex];
        if ($value) {
            $product = Product::find($data['product_id']);
            if ($product->measurement_id && $product->purchase_measurement_id) {
                $measurementCategoryId = Measurement::find($product->measurement_id)->measurement_category_id;
                $purchaseMeasurementCategoryId = Measurement::find($product->purchase_measurement_id)->measurement_category_id;
                $valueMeasurementCategoryId = Measurement::find($value)->measurement_category_id;
                if ($measurementCategoryId === $purchaseMeasurementCategoryId && $measurementCategoryId === $valueMeasurementCategoryId && $purchaseMeasurementCategoryId === $valueMeasurementCategoryId) {
                    return true;
                } else {
                    return false;
                }
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

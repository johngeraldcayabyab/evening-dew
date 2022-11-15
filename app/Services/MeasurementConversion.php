<?php

namespace App\Services;

use App\Models\Measurement;
use App\Models\Product;

class MeasurementConversion
{
    public static function convertSalesMeasurement($productId, $saleLineMeasurementId, $quantity)
    {
        $product = Product::find($productId);
        $baseMeasurement = $product->salesMeasurement;
        $saleLineMeasurement = Measurement::find($saleLineMeasurementId);

        if ($baseMeasurement->id === $saleLineMeasurementId) {
            return $quantity;
        }

        $convertedQuantity = null;

        // Bigger to reference
        if ($saleLineMeasurement->type === Measurement::BIGGER && $baseMeasurement->type === Measurement::REFERENCE) {


            $convertedQuantity = $quantity / $saleLineMeasurement->ratio;

        }

        // Smaller to reference
        if ($saleLineMeasurement->type === Measurement::SMALLER && $baseMeasurement->type === Measurement::REFERENCE) {

        }

        return $convertedQuantity;
    }
}

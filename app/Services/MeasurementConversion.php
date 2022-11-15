<?php

namespace App\Services;

use App\Models\Measurement;
use App\Models\Product;

class MeasurementConversion
{
    /**
     *
     * It might not make any sense, but the sales_measurement_id and purchase_measurement_id are just autofill
     * values for the front-end.
     *
     * Real conversion happens when something is validated and the source of truth is still the measurement_id
     *
     */
    public static function convertSalesMeasurement($productId, $saleLineMeasurementId, $quantity)
    {
        $product = Product::find($productId);
        $baseMeasurement = $product->measurement;
        $saleLineMeasurement = Measurement::find($saleLineMeasurementId);

        if ($baseMeasurement->id === $saleLineMeasurementId) {
            return $quantity;
        }

        $convertedQuantity = null;

        // Bigger to reference
        if ($saleLineMeasurement->type === Measurement::BIGGER && $baseMeasurement->type === Measurement::REFERENCE) {
            $convertedQuantity = $saleLineMeasurement->ratio * $quantity;
        }

        // Smaller to reference
        if ($saleLineMeasurement->type === Measurement::SMALLER && $baseMeasurement->type === Measurement::REFERENCE) {

        }

        return $convertedQuantity;
    }
}

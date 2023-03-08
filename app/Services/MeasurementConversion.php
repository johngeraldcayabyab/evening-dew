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
     * Meaning when you sell something with a different sales_measurement_id, it will use the base measurement("measurement_id")
     * to do the conversion, same with selling the products and etc
     *
     *
     */
    public static function convertSalesMeasurement($salesOrderLine)
    {
        $product = $salesOrderLine->product;
        $baseMeasurement = $product->measurement;
        $quantity = $salesOrderLine->quantity;
        $toConvertMeasurement = $salesOrderLine->measurement;

        // Bigger to reference
        if ($toConvertMeasurement->ratio > $baseMeasurement->ratio) {
            return $toConvertMeasurement->ratio * $quantity;
        }

        // Smaller to reference
        if ($toConvertMeasurement->ratio < $baseMeasurement->ratio) {
            return $quantity / $toConvertMeasurement->ratio;
        }

        // Do nothing if same measurement
        return $quantity;
    }

    public static function convertPurchaseMeasurement($purchaseLine)
    {
        $product = $purchaseLine->product;
        $baseMeasurement = $product->measurement;
        $quantity = $purchaseLine->quantity;
        $toConvertMeasurement = $purchaseLine->measurement;

        // Bigger to reference
        if ($toConvertMeasurement->ratio > $baseMeasurement->ratio) {
            return $toConvertMeasurement->ratio * $quantity;
        }

        // Smaller to reference
        if ($toConvertMeasurement->ratio < $baseMeasurement->ratio) {
            return $quantity / $toConvertMeasurement->ratio;
        }

        // Do nothing if same measurement
        return $quantity;
    }
}

<?php

namespace App\Observers;

use App\Models\GlobalSetting;
use App\Models\Product;

class ProductObserver
{
    public function creating(Product $product)
    {
        $this->setDefaults($product);
    }

    public function updating(Product $product)
    {
        $this->setDefaults($product);
    }

    public function setDefaults($model)
    {
        $globalSetting = GlobalSetting::latestFirst();
        $inventoryDefaultMeasurement = $globalSetting->inventoryDefaultMeasurement;
        $inventoryDefaultPurchaseMeasurement = $globalSetting->inventoryDefaultPurchaseMeasurement;
        $inventoryDefaultSalesMeasurement = $globalSetting->inventoryDefaultSalesMeasurement;
        $inventoryDefaultProductCategory = $globalSetting->inventoryDefaultProductCategory;
        if (!isset($array['product_type'])) {
            $model->product_type = Product::STORABLE;
        }
        if (!isset($array['invoicing_policy'])) {
            $model->invoicing_policy = Product::ORDERED_QUANTITIES;
        }
        if (!isset($array['sales_price'])) {
            $model->sales_price = Product::DEFAULT_SALES_PRICE;
        }
        if (!isset($array['cost'])) {
            $model->cost = Product::DEFAULT_COST;
        }
        if (!isset($array['measurement_id'])) {
            $model->measurement_id = $inventoryDefaultMeasurement->id;
        }
        if (!isset($array['purchase_measurement_id'])) {
            $model->purchase_measurement_id = $inventoryDefaultPurchaseMeasurement->id;
        }
        if (!isset($array['sales_measurement_id'])) {
            $model->sales_measurement_id = $inventoryDefaultSalesMeasurement->id;
        }
        if (!isset($array['product_category_id'])) {
            $model->product_category_id = $inventoryDefaultProductCategory->id;
        }
    }
}

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
        $product->avatar = avatar_filter($product->avatar);
        $this->setDefaults($product);
    }

    public function setDefaults($model)
    {
        $modelArray = $model->toArray();
        $globalSetting = GlobalSetting::latestFirst();
        $inventoryDefaultMeasurement = $globalSetting->inventoryDefaultMeasurement;
        $inventoryDefaultPurchaseMeasurement = $globalSetting->inventoryDefaultPurchaseMeasurement;
        $inventoryDefaultSalesMeasurement = $globalSetting->inventoryDefaultSalesMeasurement;
        $inventoryDefaultProductCategory = $globalSetting->inventoryDefaultProductCategory;
        if (!isset($modelArray['product_type'])) {
            $model->product_type = Product::STORABLE;
        }
        if (!isset($modelArray['invoicing_policy'])) {
            $model->invoicing_policy = Product::ORDERED_QUANTITIES;
        }
        if (!isset($modelArray['sales_price'])) {
            $model->sales_price = Product::DEFAULT_SALES_PRICE;
        }
        if (!isset($modelArray['cost'])) {
            $model->cost = Product::DEFAULT_COST;
        }
        if (!isset($modelArray['measurement_id'])) {
            $model->measurement_id = $inventoryDefaultMeasurement->id;
        }
        if (!isset($modelArray['purchase_measurement_id'])) {
            $model->purchase_measurement_id = $inventoryDefaultPurchaseMeasurement->id;
        }
        if (!isset($modelArray['sales_measurement_id'])) {
            $model->sales_measurement_id = $inventoryDefaultSalesMeasurement->id;
        }
        if (!isset($modelArray['product_category_id'])) {
            $model->product_category_id = $inventoryDefaultProductCategory->id;
        }
        if (isset($modelArray['sales_price'])) {
            $model->sales_price = (float)$model->sales_price;
        }
    }
}

<?php

namespace App\Observers;

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
        $defaults = Product::defaults();
        $arrayed = $model->toArray();
        foreach ($arrayed as $array) {
            if (!isset($array['product_type'])) {
                $model->product_type = $defaults['product_type'];
            }
            if (!isset($array['invoicing_policy'])) {
                $model->invoicing_policy = $defaults['invoicing_policy'];
            }
            if (!isset($array['sales_price'])) {
                $model->sales_price = $defaults['sales_price'];
            }
            if (!isset($array['cost'])) {
                $model->cost = $defaults['cost'];
            }
            if (!isset($array['measurement_id'])) {
                $model->measurement_id = $defaults['measurement_id'];
            }
            if (!isset($array['purchase_measurement_id'])) {
                $model->purchase_measurement_id = $defaults['purchase_measurement_id'];
            }
            if (!isset($array['sales_measurement_id'])) {
                $model->sales_measurement_id = $defaults['sales_measurement_id'];
            }
            if (!isset($array['product_category_id'])) {
                $model->product_category_id = $defaults['product_category_id'];
            }
        }
    }
}

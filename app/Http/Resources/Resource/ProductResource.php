<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'product_type' => $this->product_type,
            'invoicing_policy' => $this->invoicing_policy,
            'cost' => $this->cost,
            'sales_price' => $this->sales_price,
            'measurement_id' => $this->measurement_id,
            'measurement' => new MeasurementResource($this->measurement),
            'purchase_measurement_id' => $this->purchase_measurement_id,
            'purchase_measurement' => new MeasurementResource($this->purchaseMeasurement),
            'sales_measurement_id' => $this->sales_measurement_id,
            'sales_measurement' => new MeasurementResource($this->salesMeasurement),
            'product_category_id' => $this->product_category_id,
            'product_category' => new ProductCategoryResource($this->productCategory),
            'internal_reference' => $this->internal_reference,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'sales_description' => $this->sales_description,
            'purchase_description' => $this->purchase_description,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

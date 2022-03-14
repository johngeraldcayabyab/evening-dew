<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'product_type' => $this->product_type,
            'invoicing_policy' => $this->invoicing_policy,
            'sales_price' => $this->sales_price,
            'cost' => $this->cost,
            'measurement_id' => $this->measurement_id,
            'purchase_measurement_id' => $this->purchase_measurement_id,
            'sales_measurement_id' => $this->sales_measurement_id,
            'product_category_id' => $this->product_category_id,
            'internal_reference' => $this->internal_reference,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'sales_description' => $this->sales_description,
            'purchase_description' => $this->purchase_description,
            'quantity' => $this->quantity,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'measurement' => new MeasurementResource($this->measurement),
            'purchase_measurement' => new MeasurementResource($this->purchaseMeasurement),
            'sales_measurement' => new MeasurementResource($this->salesMeasurement),
            'product_category' => new ProductCategoryResource($this->productCategory),
            'slug' => $this->$slug,
        ];
    }
}

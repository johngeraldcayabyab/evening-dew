<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'product_type' => $this->product_type,
            'can_be_sold' => $this->can_be_sold,
            'can_be_purchased' => $this->can_be_purchased,
            'invoicing_policy' => $this->invoicing_policy,
            'sales_price' => number_format($this->sales_price, 2),
            'cost' => $this->cost,
            'measurement_id' => $this->measurement_id,
            'purchase_measurement_id' => $this->purchase_measurement_id,
            'sales_measurement_id' => $this->sales_measurement_id,
            'product_category_id' => $this->product_category_id,
            'internal_reference' => $this->internal_reference,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'sales_description' => $this->sales_description,
            'purchase_description' => $this->purchase_description,
            'quantity' => number_format($this->quantity, 2),
            'measurement' => new MeasurementResource($this->measurement),
            'purchase_measurement' => new MeasurementResource($this->purchaseMeasurement),
            'sales_measurement' => new MeasurementResource($this->salesMeasurement),
            'product_category' => new ProductCategoryResource($this->productCategory),
            'slug' => $this->$slug,
        ]);
    }
}

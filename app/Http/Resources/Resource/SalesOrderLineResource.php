<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderLineResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'measurement_id' => $this->measurement_id,
            'unit_price' => $this->unit_price,
            'subtotal' => $this->subtotal,
            'sales_order_id' => $this->sales_order_id,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'product' => new ProductResource($this->product),
            'measurement' => new MeasurementResource($this->measurement),
            'slug' => $this->$slug,
        ];
    }
}

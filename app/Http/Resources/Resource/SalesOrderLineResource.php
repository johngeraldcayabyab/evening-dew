<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderLineResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'product' => new ProductResource($this->product),
            'description' => $this->description,
            'quantity' => $this->quantity,
            'measurement_id' => $this->measurement_id,
            'measurement' => new MeasurementResource($this->measurement),
            'unit_price' => $this->unit_price,
            'subtotal' => $this->subtotal,
            'sales_order_id' => $this->sales_order_id,
            'created_at' => null,
        ];
    }
}

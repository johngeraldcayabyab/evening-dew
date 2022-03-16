<?php

namespace App\Http\Resources\Resource;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderLineResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, [
            'product_id' => $this->product_id,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'measurement_id' => $this->measurement_id,
            'unit_price' => $this->unit_price,
            'subtotal' => $this->subtotal,
            'sales_order_id' => $this->sales_order_id,
            'product' => new ProductResource($this->product),
            'measurement' => new MeasurementResource($this->measurement),
        ]);
    }
}

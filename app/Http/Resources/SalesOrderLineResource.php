<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderLineResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, $request, [
            'product_id' => $this->product_id,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'measurement_id' => $this->measurement_id,
            'unit_price' => $this->unit_price,
            'subtotal' => $this->subtotal,
            'shipping_date' => $this->shipping_date,
            'sales_order_id' => $this->sales_order_id,
            'product' => $this->product,
            'measurement' => $this->measurement,
            'sales_order' => $this->salesOrder,
        ]);
    }
}

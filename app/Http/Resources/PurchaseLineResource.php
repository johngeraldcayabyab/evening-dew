<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseLineResource extends JsonResource
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
            'receiving_date' => $this->receiving_date,
            'purchase_id' => $this->purchase_id,
            'product' => $this->product,
            'measurement' => $this->measurement,
            'purchase' => $this->purchase,
        ]);
    }
}

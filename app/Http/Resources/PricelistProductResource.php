<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class PricelistProductResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, $request, [
            'id' => $this->id,
            'pricelist_id' => $this->pricelist_id,
            'product_id' => $this->product_id,
            'unit_price' => $this->unit_price
        ]);
    }
}

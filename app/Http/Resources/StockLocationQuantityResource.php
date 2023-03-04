<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class StockLocationQuantityResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => Str::uuid(),
            'product_name' => $this->product_name,
            'location_name' => $this->location_name,
            'quantity' => $this->quantity,
        ];
    }
}

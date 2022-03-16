<?php

namespace App\Http\Resources\Resource;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class StockMovementResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, [
            'reference' => $this->reference,
            'source' => $this->source,
            'product_id' => $this->product_id,
            'source_location_id' => $this->source_location_id,
            'destination_location_id' => $this->destination_location_id,
            'quantity_done' => $this->quantity_done,
            'product' => new ProductResource($this->product),
            'source_location' => new LocationResource($this->sourceLocation),
            'destination_location' => new LocationResource($this->destinationLocation),
            'slug' => $this->$slug,
        ]);
    }
}

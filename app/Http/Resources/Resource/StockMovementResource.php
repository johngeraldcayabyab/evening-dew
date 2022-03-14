<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class StockMovementResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'source' => $this->source,
            'product_id' => $this->product_id,
            'source_location_id' => $this->source_location_id,
            'destination_location_id' => $this->destination_location_id,
            'quantity_done' => $this->quantity_done,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'product' => new ProductResource($this->product),
            'source_location' => new LocationResource($this->sourceLocation),
            'destination_location' => new LocationResource($this->destinationLocation),
            'slug' => $this->$slug,
        ];
    }
}

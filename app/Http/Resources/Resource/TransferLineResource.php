<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class TransferLineResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'description' => $this->description,
            'demand' => $this->demand,
            'measurement_id' => $this->measurement_id,
            'transfer_id' => $this->transfer_id,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'product' => new ProductResource($this->product),
            'measurement' => new MeasurementResource($this->measurement),
        ];
    }
}

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
            'product' => new ProductResource($this->product),
            'description' => $this->description,
            'demand' => $this->demand,
            'measurement_id' => $this->measurement_id,
            'measurement' => new MeasurementResource($this->measurement),
            'transfer_id' => $this->transfer_id,
            'created_at' => null,
        ];
    }
}

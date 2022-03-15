<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class MaterialLineResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'quantity' => $this->quantity,
            'measurement_id' => $this->measurement_id,
            'material_id' => $this->material_id,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'product' => new ProductResource($this->product),
            'measurement' => new MeasurementResource($this->measurement),
        ];
    }
}
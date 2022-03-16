<?php

namespace App\Http\Resources\Resource;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class TransferLineResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, [
            'product_id' => $this->product_id,
            'description' => $this->description,
            'demand' => $this->demand,
            'measurement_id' => $this->measurement_id,
            'transfer_id' => $this->transfer_id,
            'product' => new ProductResource($this->product),
            'measurement' => new MeasurementResource($this->measurement),
        ]);
    }
}

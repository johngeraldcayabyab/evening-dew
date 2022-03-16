<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialLineResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, [
            'product_id' => $this->product_id,
            'quantity' => $this->quantity,
            'measurement_id' => $this->measurement_id,
            'material_id' => $this->material_id,
            'product' => new ProductResource($this->product),
            'measurement' => new MeasurementResource($this->measurement),
        ]);
    }
}

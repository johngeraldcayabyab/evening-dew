<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class AdjustmentLineResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, $request, [
            'product_id' => $this->product_id,
            'measurement_id' => $this->measurement_id,
            'material_id' => $this->material_id,
            'quantity_on_hand' => $this->quantity_on_hand,
            'quantity_counted' => $this->quantity_counted,
            'product' => new ProductResource($this->product),
            'measurement' => new MeasurementResource($this->measurement),
        ]);
    }
}

<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'product_id' => $this->product_id,
            'measurement_id' => $this->measurement_id,
            'reference' => $this->reference,
            'material_type' => $this->material_type,
            'flexible_consumption' => $this->flexible_consumption,
            'product' => $this->product,
            'material_lines' => MaterialLineResource::collection($this->materialLines),
            'measurement' => new MeasurementResource($this->measurement),
            'slug' => $this->$slug,
        ]);
    }
}

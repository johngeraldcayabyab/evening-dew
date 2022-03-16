<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class MeasurementResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'type' => $this->type,
            'ratio' => $this->ratio,
            'rounding_precision' => $this->rounding_precision,
            'measurement_category_id' => $this->measurement_category_id,
            'measurement_category' => new MeasurementCategoryResource($this->measurementCategory),
            'slug' => $this->$slug,
        ]);
    }
}

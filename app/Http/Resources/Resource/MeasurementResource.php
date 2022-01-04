<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class MeasurementResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'ratio' => $this->ratio,
            'rounding_precision' => $this->rounding_precision,
            'measurement_category_id' => $this->measurement_category_id,
            'measurement_category' => new MeasurementCategoryResource($this->measurementCategory),
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

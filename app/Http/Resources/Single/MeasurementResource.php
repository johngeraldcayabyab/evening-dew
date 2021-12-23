<?php

namespace App\Http\Resources\Single;

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
        ];
    }
}

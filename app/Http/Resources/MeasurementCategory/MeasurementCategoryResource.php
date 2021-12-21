<?php

namespace App\Http\Resources\MeasurementCategory;

use Illuminate\Http\Resources\Json\JsonResource;

class MeasurementCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}

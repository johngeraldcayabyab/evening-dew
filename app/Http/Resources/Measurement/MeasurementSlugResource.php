<?php

namespace App\Http\Resources\Measurement;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class MeasurementSlugResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'key' => Str::uuid(),
            'slug' => $this->name
        ];
    }
}

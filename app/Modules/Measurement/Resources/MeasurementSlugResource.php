<?php

namespace App\Modules\Measurement\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class MeasurementSlugResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'key' => Str::uuid(),
            'slug' => $this->name
        ];
    }
}

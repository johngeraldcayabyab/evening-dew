<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class MeasureCategorySlugResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'key' => Str::uuid(),
            'slug' => $this->name
        ];
    }
}

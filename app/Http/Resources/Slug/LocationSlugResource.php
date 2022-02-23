<?php

namespace App\Http\Resources\Slug;

use Illuminate\Http\Resources\Json\JsonResource;

class LocationSlugResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->getWithParents('name')
        ];
    }
}

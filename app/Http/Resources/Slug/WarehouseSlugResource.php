<?php

namespace App\Http\Resources\Slug;

use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseSlugResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'slug' => $this->$slug,
        ];
    }
}

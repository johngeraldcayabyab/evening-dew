<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class MeasurementCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'slug' => $this->$slug,
        ];
    }
}

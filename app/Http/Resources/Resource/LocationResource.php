<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'with_parents' => $this->with_parents,
            'parent_location_id' => $this->parent_location_id,
            'is_a_scrap_location' => $this->is_a_scrap_location,
            'is_a_return_location' => $this->is_a_return_location,
            'type' => $this->type,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

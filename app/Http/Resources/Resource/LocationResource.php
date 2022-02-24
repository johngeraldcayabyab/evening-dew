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
            'parents' => $this->getWithParents('name'),
            'parent_location_id' => $this->parent_location_id,
            'parent_location' => new LocationResource($this->parentLocation),
            'is_a_scrap_location' => $this->is_a_scrap_location,
            'is_a_return_location' => $this->is_a_return_location,
            'type' => $this->type,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

<?php

namespace App\Http\Resources\Resource;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->getWithParents('name');
        return $this->defaults($this, [
            'name' => $this->name,
            'parent_location_id' => $this->parent_location_id,
            'is_a_scrap_location' => $this->is_a_scrap_location,
            'is_a_return_location' => $this->is_a_return_location,
            'type' => $this->type,
            'parent_location' => new LocationResource($this->parentLocation),
            'parents' => $slug,
            'slug' => $slug,
        ]);
    }
}

<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class RegionResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'region' => $this->region,
            'region_center' => $this->region_center,
            'country' => new CountryResource($this->country),
            'slug' => $this->$slug,
        ]);
    }
}


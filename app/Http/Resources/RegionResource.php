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
            'region_name' => $this->region_name,
            'region_code' => $this->region_code,
            'country_id' => $this->country_id,
            'country' => new CountryResource($this->country),
            'slug' => $this->$slug,
        ]);
    }
}


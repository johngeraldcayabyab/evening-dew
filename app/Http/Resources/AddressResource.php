<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'address_name' => $this->address_name,
            'address' => $this->address,
            'city' => $this->city,
            'zip' => $this->zip,
            'country_id' => $this->country_id,
            'region_id' => $this->region_id,
            'contact_id' => $this->contact_id,
            'type' => $this->type,
            'country' => new CountryResource($this->country),
            'region' => new RegionResource($this->region),
            'contact' => new ContactResource($this->contact),
            'slug' => $this->$slug,
        ]);
    }
}

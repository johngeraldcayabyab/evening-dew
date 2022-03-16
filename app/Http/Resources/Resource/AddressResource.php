<?php

namespace App\Http\Resources\Resource;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, [
            'address_name' => $this->address_name,
            'street_one' => $this->street_one,
            'street_two' => $this->street_two,
            'city' => $this->city,
            'state' => $this->state,
            'zip' => $this->zip,
            'country_id' => $this->country_id,
            'contact_id' => $this->contact_id,
            'type' => $this->type,
            'country' => new CountryResource($this->country),
            'contact' => new ContactResource($this->contact),
            'slug' => $this->$slug,
        ]);
    }
}

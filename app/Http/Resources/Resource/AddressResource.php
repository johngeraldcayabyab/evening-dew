<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'address_name' => $this->address_name,
            'street_one' => $this->street_one,
            'street_two' => $this->street_two,
            'city' => $this->city,
            'state' => $this->state,
            'zip' => $this->zip,
            'country_id' => $this->country_id,
            'contact_id' => $this->contact_id,
            'type' => $this->type,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'country' => new CountryResource($this->country),
            'contact' => new ContactResource($this->contact),
        ];
    }
}

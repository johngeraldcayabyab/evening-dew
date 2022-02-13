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
            'street_1' => $this->street_1,
            'street_2' => $this->street_2,
            'city' => $this->city,
            'state' => $this->state,
            'zip' => $this->zip,
            'country_id' => $this->country_id,
            'country' => new CountryResource($this->country),
            'contact_id' => $this->contact_id,
            'contact' => new ContactResource($this->contact),
            'type' => $this->type,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

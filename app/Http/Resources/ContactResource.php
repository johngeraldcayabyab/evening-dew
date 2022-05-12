<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        $defaultAddress = $this->defaultAddress();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'phone' => $this->phone,
            'mobile' => $this->mobile,
            'email' => $this->email,
            'website' => $this->website,
            'tax_id' => $this->tax_id,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'street_one' => $defaultAddress->street_one,
            'city' => $defaultAddress->city,
            'zip' => $defaultAddress->zip,
            'country_id' => $defaultAddress->country_id,
            'region_id' => $defaultAddress->region_id,
            'country' => new CountryResource($defaultAddress->country),
            'region' => new RegionResource($defaultAddress->region),
            'slug' => $this->$slug,
        ]);
    }
}

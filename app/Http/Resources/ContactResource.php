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
            'pricelist_id' => $this->pricelist_id,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'address' => $defaultAddress ? $defaultAddress->address : null,
            'zip' => $defaultAddress ? $defaultAddress->zip : null,
            'country_id' => $defaultAddress ? $defaultAddress->country_id : null,
            'city_id' => $defaultAddress ? $defaultAddress->city_id : null,
            'country' => $defaultAddress ? new CountryResource($defaultAddress->country) : null,
            'city' => $defaultAddress ? new CityResource($defaultAddress->city) : null,
            'slug' => $this->$slug,
        ]);
    }
}

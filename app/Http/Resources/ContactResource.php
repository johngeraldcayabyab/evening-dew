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
            'address' => $defaultAddress->address,
            'zip' => $defaultAddress->zip,
            'country_id' => $defaultAddress->country_id,
            'city_id' => $defaultAddress->city_id,
            'country' => new CountryResource($defaultAddress->country),
            'city' => $defaultAddress->city,
            'slug' => $this->$slug,
        ]);
    }
}

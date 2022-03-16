<?php

namespace App\Http\Resources\Resource;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class CountryResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, [
            'country_name' => $this->country_name,
            'currency_id' => $this->currency_id,
            'country_code' => $this->country_code,
            'country_calling_code' => $this->country_calling_code,
            'vat_label' => $this->vat_label,
            'currency' => new CurrencyResource($this->currency),
            'slug' => $this->$slug,
        ]);
    }
}

<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class CountryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'country_name' => $this->country_name,
            'currency_id' => $this->currency_id,
            'country_code' => $this->country_code,
            'country_calling_code' => $this->country_calling_code,
            'vat_label' => $this->vat_label,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'currency' => new CurrencyResource($this->currency),
        ];
    }
}

<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class CurrencyResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'currency' => $this->currency,
            'name' => $this->name,
            'unit' => $this->unit,
            'sub_unit' => $this->sub_unit,
            'rounding_factor' => $this->rounding_factor,
            'decimal_places' => $this->decimal_places,
            'symbol' => $this->symbol,
            'symbol_position' => $this->symbol_position,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'slug' => $this->$slug,
        ];
    }
}

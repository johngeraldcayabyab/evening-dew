<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class CurrencyResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'currency' => $this->currency,
            'name' => $this->name,
            'unit' => $this->unit,
            'sub_unit' => $this->sub_unit,
            'rounding_factor' => $this->rounding_factor,
            'decimal_places' => $this->decimal_places,
            'symbol' => $this->symbol,
            'symbol_position' => $this->symbol_position,
            'is_default' => $this->is_default,
            'slug' => $this->$slug,
        ]);
    }
}

<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class PricelistResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'id' => $this->id,
            'name' => $this->name,
            'customer_products' => PricelistProductResource::collection($this->products),
            'slug' => $this->$slug
        ]);
    }
}

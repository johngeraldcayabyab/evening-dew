<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class CityResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'province' => $this->province,
            'region_id' => $this->region_id,
            'region' => new RegionResource($this->region),
            'slug' => $this->$slug,
            'delivery_fee_lines' => DeliveryFeeLineResource::collection($this->deliveryFeeLines),
        ]);
    }
}

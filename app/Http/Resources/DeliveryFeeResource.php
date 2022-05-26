<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryFeeResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'is_enabled' => $this->is_enabled,
            'product_id' => $this->product_id,
            'product' => $this->product,
            'delivery_fee_lines' => DeliveryFeeLineResource::collection($this->deliveryFeeLines),
            'slug' => $this->$slug,
        ]);
    }
}

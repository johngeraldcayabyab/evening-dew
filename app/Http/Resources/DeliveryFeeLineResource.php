<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryFeeLineResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, $request, [
            'city_id' => $this->city_id,
            'city' => $this->city,
            'fee' => $this->fee,
            'delivery_fee' => $this->deliveryFee,
            'product' => $this->deliveryFee->product
        ]);
    }
}

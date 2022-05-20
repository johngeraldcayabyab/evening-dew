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
            'amount' => $this->amount,
            'city' => $this->city,
        ]);
    }
}

<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'product_type' => $this->product_type,
            'invoicing_policy' => $this->invoicing_policy,
            'cost' => $this->cost,
            'sales_price' => $this->sales_price,
            'measurement_id' => $this->measurement_id,
            'purchase_measurement_id' => $this->purchase_measurement_id,
            'sales_measurement_id' => $this->sales_measurement_id,
            'internal_reference' => $this->internal_reference,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

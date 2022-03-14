<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class MaterialResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'quantity' => $this->quantity,
            'measurement_id' => $this->measurement_id,
            'reference' => $this->reference,
            'material_type' => $this->material_type,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'product' => $this->product,
            'slug' => $this->$slug,
        ];
    }
}
<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'category' => $this->category,
            'product_category_id' => $this->product_category_id,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

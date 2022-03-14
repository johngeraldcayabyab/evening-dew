<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->getWithParents('label');
        return [
            'id' => $this->id,
            'category' => $this->category,
            'parent_product_category_id' => $this->parent_product_category_id,
            'parent_product_category' => new ProductCategoryResource($this->parentProductCategory),
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'parents' => $slug,
            'slug' => $slug,
        ];
    }
}

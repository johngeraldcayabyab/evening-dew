<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductCategoryResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->getWithParents('category');
        return $this->defaults($this, $request, [
            'category' => $this->category,
            'parent_product_category_id' => $this->parent_product_category_id,
            'is_default' => $this->is_default,
            'costing_method' => $this->costing_method,
            'parent_product_category' => new ProductCategoryResource($this->parentProductCategory),
            'parents' => $slug,
            'slug' => $slug,
        ]);
    }
}

<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class AdjustmentResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'number' => $this->number,
            'product_category_id' => $this->product_category_id,
            'product_category' => new ProductCategoryResource($this->productCategory),
            'adjustment_lines' => AdjustmentLineResource::collection($this->adjustmentLines),
            'status' => $this->status,
            'slug' => $this->$slug,
        ]);
    }
}

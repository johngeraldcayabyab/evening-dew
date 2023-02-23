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
            'source_document' => $this->source_document,
            'product_category_id' => $this->product_category_id,
            'warehouse_id' => $this->warehouse_id,
            'product_category' => new ProductCategoryResource($this->productCategory),
            'warehouse' => new WarehouseResource($this->warehouse),
            'adjustment_lines' => AdjustmentLineResource::collection($this->adjustmentLines),
            'status' => $this->status,
            'slug' => $this->$slug,
        ]);
    }
}

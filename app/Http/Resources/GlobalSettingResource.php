<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GlobalSettingResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'inventory_auto_validate_draft' => $this->inventory_auto_validate_draft,
            'inventory_compute_product_quantity' => $this->inventory_compute_product_quantity,
            'general_clickable_row' => $this->general_clickable_row,
        ];
    }
}

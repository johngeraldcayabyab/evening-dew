<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class GlobalSettingResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'inventory_default_measurement_category_id' => $this->inventory_default_measurement_category_id,
            'inventory_default_measurement_id' => $this->inventory_default_measurement_id,
            'inventory_default_purchase_measurement_id' => $this->inventory_default_purchase_measurement_id,
            'inventory_default_sales_measurement_id' => $this->inventory_default_sales_measurement_id,
            'inventory_default_product_category_id' => $this->inventory_default_product_category_id,
        ];
    }
}

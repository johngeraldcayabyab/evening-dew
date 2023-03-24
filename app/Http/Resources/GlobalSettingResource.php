<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GlobalSettingResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'inventory_default_purchase_measurement_id' => $this->inventory_default_purchase_measurement_id,
            'inventory_default_sales_measurement_id' => $this->inventory_default_sales_measurement_id,
            'inventory_auto_validate_draft' => $this->inventory_auto_validate_draft,
            'inventory_compute_product_quantity' => $this->inventory_compute_product_quantity,
            'general_clickable_row' => $this->general_clickable_row,
            'sales_order_default_delivery_fee_id' => $this->sales_order_default_delivery_fee_id,
            'inventory_default_purchase_measurement' => $this->inventoryDefaultPurchaseMeasurement,
            'inventory_default_sales_measurement' => $this->inventoryDefaultSalesMeasurement,
            'sales_order_default_delivery_fee' => $this->salesOrderDefaultDeliveryFee,
        ];
    }
}

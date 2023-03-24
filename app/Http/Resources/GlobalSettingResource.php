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
            'inventory_default_adjustment_location_id' => $this->inventory_default_adjustment_location_id,
            'inventory_default_production_id' => $this->inventory_default_production_id,
            'inventory_default_scrap_id' => $this->inventory_default_scrap_id,
            'inventory_auto_validate_draft' => $this->inventory_auto_validate_draft,
            'inventory_compute_product_quantity' => $this->inventory_compute_product_quantity,
            'accounting_default_currency_id' => $this->accounting_default_currency_id,
            'general_default_country_id' => $this->general_default_country_id,
            'general_clickable_row' => $this->general_clickable_row,
            'sales_order_default_delivery_fee_id' => $this->sales_order_default_delivery_fee_id,
            'inventory_default_purchase_measurement' => $this->inventoryDefaultPurchaseMeasurement,
            'inventory_default_sales_measurement' => $this->inventoryDefaultSalesMeasurement,
            'inventory_default_adjustment_location' => $this->inventoryDefaultAdjustmentLocation,
            'inventory_default_production' => $this->inventoryDefaultProduction,
            'inventory_default_scrap' => $this->inventoryDefaultScrap,
            'accounting_default_currency' => $this->accountingDefaultCurrency,
            'general_default_country' => $this->generalDefaultCountry,
            'sales_order_default_delivery_fee' => $this->salesOrderDefaultDeliveryFee,
        ];
    }
}

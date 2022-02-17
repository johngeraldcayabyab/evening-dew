<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class GlobalSettingResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'inventory_default_measurement_category_id' => $this->inventory_default_measurement_category_id,
            'inventory_default_measurement_category' => $this->inventoryDefaultMeasurementCategory,
            'inventory_default_measurement_id' => $this->inventory_default_measurement_id,
            'inventory_default_measurement' => $this->inventoryDefaultMeasurement,
            'inventory_default_purchase_measurement_id' => $this->inventory_default_purchase_measurement_id,
            'inventory_default_purchase_measurement' => $this->inventoryDefaultPurchaseMeasurement,
            'inventory_default_sales_measurement_id' => $this->inventory_default_sales_measurement_id,
            'inventory_default_sales_measurement' => $this->inventoryDefaultSalesMeasurement,
            'inventory_default_product_category_id' => $this->inventory_default_product_category_id,
            'inventory_default_product_category' => $this->inventoryDefaultProductCategory,
            'accounting_default_currency_id' => $this->accounting_default_currency_id,
            'accounting_default_currency' => $this->accountingDefaultCurrency,
            'general_default_country_id' => $this->general_default_country_id,
            'general_default_country' => $this->generalDefaultCountry,
            'sales_order_default_sequence_id' => $this->sales_order_default_sequence_id,
            'sales_order_default_sequence' => $this->salesOrderDefaultSequence
        ];
    }
}

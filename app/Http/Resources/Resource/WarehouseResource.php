<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'short_name' => $this->short_name,
            'manufacture_to_resupply' => $this->manufacture_to_resupply,
            'buy_to_resupply' => $this->buy_to_resupply,
            'stock_location_id' => $this->stock_location_id,
            'stock_location' => $this->stockLocation,
            'view_location_id' => $this->view_location_id,
            'view_location' => $this->viewLocation,
            'input_location_id' => $this->input_location_id,
            'input_location' => $this->inputLocation,
            'quality_control_location_id' => $this->quality_control_location_id,
            'quality_control_location' => $this->qualityControlLocation,
            'packing_location_id' => $this->packing_location_id,
            'packing_location' => $this->packingLocation,
            'output_location_id' => $this->output_location_id,
            'output_location' => $this->outputLocation,
            'stock_after_manufacturing_location_id' => $this->stock_after_manufacturing_location_id,
            'stock_after_manufacturing_location' => $this->stockAfterManufacturingLocation,
            'picking_before_manufacturing_location_id' => $this->picking_before_manufacturing_location_id,
            'picking_before_manufacturing_location' => $this->pickingBeforeManufacturingLocation,
            'in_type_id' => $this->in_type_id,
            'in_type' => $this->inType,
            'internal_type_id' => $this->internal_type_id,
            'internal_type' => $this->internalType,
            'pick_type_id' => $this->pick_type_id,
            'pick_type' => $this->pickType,
            'pack_type_id' => $this->pack_type_id,
            'pack_type' => $this->packType,
            'out_type_id' => $this->out_type_id,
            'out_type' => $this->outType,
            'stock_after_manufacturing_operation_type_id' => $this->stock_after_manufacturing_operation_type_id,
            'stock_after_manufacturing_operation_type' => $this->stockAfterManufacturingOperationType,
            'picking_before_manufacturing_operation_type_id' => $this->picking_before_manufacturing_operation_type_id,
            'picking_before_manufacturing_operation_type' => $this->pickingBeforeManufacturingOperationType,
            'manufacturing_operation_type_id' => $this->manufacturing_operation_type_id,
            'manufacturing_operation_type' => $this->manufacturingOperationType,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

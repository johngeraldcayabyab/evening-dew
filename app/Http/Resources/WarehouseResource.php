<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'short_name' => $this->short_name,
            'manufacture_to_resupply' => $this->manufacture_to_resupply,
            'buy_to_resupply' => $this->buy_to_resupply,
            'view_location_id' => $this->view_location_id,
            'stock_location_id' => $this->stock_location_id,
            'input_location_id' => $this->input_location_id,
            'quality_control_location_id' => $this->quality_control_location_id,
            'packing_location_id' => $this->packing_location_id,
            'output_location_id' => $this->output_location_id,
            'stock_after_manufacturing_location_id' => $this->stock_after_manufacturing_location_id,
            'picking_before_manufacturing_location_id' => $this->picking_before_manufacturing_location_id,
            'adjustment_location_id' => $this->adjustment_location_id,
            'in_type_id' => $this->in_type_id,
            'internal_type_id' => $this->internal_type_id,
            'pick_type_id' => $this->pick_type_id,
            'pack_type_id' => $this->pack_type_id,
            'out_type_id' => $this->out_type_id,
            'stock_after_manufacturing_operation_type_id' => $this->stock_after_manufacturing_operation_type_id,
            'picking_before_manufacturing_operation_type_id' => $this->picking_before_manufacturing_operation_type_id,
            'manufacturing_operation_type_id' => $this->manufacturing_operation_type_id,
            'adjustment_operation_type_id' => $this->adjustment_operation_type_id,
            'is_default' => $this->is_default,
            'stock_location' => new LocationResource($this->stockLocation),
            'view_location' => new LocationResource($this->viewLocation),
            'input_location' => new LocationResource($this->inputLocation),
            'quality_control_location' => new LocationResource($this->qualityControlLocation),
            'packing_location' => new LocationResource($this->packingLocation),
            'output_location' => new LocationResource($this->outputLocation),
            'stock_after_manufacturing_location' => new LocationResource($this->stockAfterManufacturingLocation),
            'picking_before_manufacturing_location' => new LocationResource($this->pickingBeforeManufacturingLocation),
            'adjustment_location' => new LocationResource($this->adjustmentLocation),
            'in_type' => new OperationTypeResource($this->inType),
            'internal_type' => new OperationTypeResource($this->internalType),
            'pick_type' => new OperationTypeResource($this->pickType),
            'pack_type' => new OperationTypeResource($this->packType),
            'out_type' => new OperationTypeResource($this->outType),
            'stock_after_manufacturing_operation_type' => new OperationTypeResource($this->stockAfterManufacturingOperationType),
            'picking_before_manufacturing_operation_type' => new OperationTypeResource($this->pickingBeforeManufacturingOperationType),
            'manufacturing_operation_type' => new OperationTypeResource($this->manufacturingOperationType),
            'adjustment_operation_type' => new OperationTypeResource($this->adjustmentOperationType),
            'slug' => $this->$slug,
        ]);
    }
}

<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class OperationTypeResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'reference_sequence_id' => $this->reference_sequence_id,
            'code' => $this->code,
            'warehouse_id' => $this->warehouse_id,
            'reservation_method' => $this->reservation_method,
            'type' => $this->type,
            'operation_type_for_returns_id' => $this->operation_type_for_returns_id,
            'show_detailed_operation' => $this->show_detailed_operation,
            'pre_fill_detailed_operation' => $this->pre_fill_detailed_operation,
            'reservation_days_before' => $this->reservation_days_before,
            'reservation_days_before_priority' => $this->reservation_days_before_priority,
            'create_new_lots_serial_numbers' => $this->create_new_lots_serial_numbers,
            'use_existing_lots_serial_numbers' => $this->use_existing_lots_serial_numbers,
            'create_new_lots_serial_numbers_for_components' => $this->create_new_lots_serial_numbers_for_components,
            'default_source_location_id' => $this->default_source_location_id,
            'default_destination_location_id' => $this->default_destination_location_id,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'reference_sequence' => new SequenceResource($this->referenceSequence),
            'warehouse' => $this->warehouse,
            'operation_type_for_returns' => new OperationTypeResource($this->operationTypeForReturns),
            'default_source_location' => new LocationResource($this->defaultSourceLocation),
            'default_destination_location' => new LocationResource($this->defaultDestinationLocation),
            'slug' => $this->$slug,
        ];
    }
}

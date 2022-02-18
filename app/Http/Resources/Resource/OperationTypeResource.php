<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class OperationTypeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'reference_sequence_id' => $this->reference_sequence_id,
            'reference_sequence' => $this->referenceSequence,
            'code' => $this->code,
            'warehouse_id' => $this->warehouse_id,
            'warehouse' => $this->warehouse,
            'reservation_method' => $this->reservation_method,
            'type' => $this->type,
            'operation_type_for_returns_id' => $this->operation_type_for_returns_id,
            'operation_type_for_returns' => $this->operationTypeForReturns,
            'show_detailed_operation' => $this->show_detailed_operation,
            'pre_fill_detailed_operation' => $this->pre_fill_detailed_operation,
            'reservation_days_before' => $this->reservation_days_before,
            'reservation_days_before_priority' => $this->reservation_days_before_priority,
            'create_new_lots_serial_numbers' => $this->create_new_lots_serial_numbers,
            'use_existing_lots_serial_numbers' => $this->use_existing_lots_serial_numbers,
            'default_source_location_id' => $this->default_source_location_id,
            'default_source_location' => $this->defaultSourceLocation,
            'default_destination_location_id' => $this->default_destination_location_id,
            'default_destination_location' => $this->defaultDestinationLocation,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

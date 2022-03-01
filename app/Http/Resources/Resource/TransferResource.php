<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class TransferResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'contact_id' => $this->contact_id,
            'operation_type_id' => $this->operation_type_id,
            'source_location_id' => $this->source_location_id,
            'destination_location_id' => $this->destination_location_id,
            'scheduled_date' => $this->scheduled_date,
            'source_document' => $this->source_document,
            'tracking_reference' => $this->tracking_reference,
            'weight' => $this->weight,
            'weight_for_shipping' => $this->weight_for_shipping,
            'shipping_policy' => $this->shipping_policy,
            'responsible_id' => $this->responsible_id,
            'note' => $this->note,
            'contact' => $this->contact_id ? $this->contact : null,
            'operation_type' => $this->operation_type_id ? $this->operationType : null,
            'source_location' => $this->source_location_id ? $this->sourceLocation : null,
            'destination_location' => $this->destination_location_id ? $this->destinationLocation : null,
            'responsible' => $this->responsible_id ? $this->responsible : null,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

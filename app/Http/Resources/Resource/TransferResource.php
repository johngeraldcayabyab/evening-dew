<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class TransferResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
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
            'contact' => $this->contact->name,
            'operation_type' => $this->operationType->name,
            'source_location' => $this->sourceLocation->name,
            'destination_location' => $this->destinationLocation->name,
            'responsible' => $this->responsible->name,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

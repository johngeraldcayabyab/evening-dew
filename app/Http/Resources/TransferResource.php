<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TransferResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
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
            'status' => $this->status,
            'contact' => new ContactResource($this->contact),
            'operation_type' => new OperationTypeResource($this->operationType),
            'source_location' => new LocationResource($this->sourceLocation),
            'destination_location' => new LocationResource($this->destinationLocation),
            'responsible' => new UserResource($this->responsible),
            'transfer_lines' => TransferLineResource::collection($this->transferLines),
            'scheduled_date_human' => Carbon::parse($this->scheduled_date)->diffForHumans(),
            'slug' => $this->$slug,
        ]);
    }
}

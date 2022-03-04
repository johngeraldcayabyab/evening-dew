<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderTransferResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'transfer_id' => $this->transfer_id,
            'transfer' => new TransferResource($this->transfer),
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

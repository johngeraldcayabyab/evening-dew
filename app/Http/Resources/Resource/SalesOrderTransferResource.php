<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderTransferResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'sales_order_id' => $this->sales_order_id,
            'transfer_id' => $this->transfer_id,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

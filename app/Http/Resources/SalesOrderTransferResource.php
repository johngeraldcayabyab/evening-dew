<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderTransferResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, $request, [
            'sales_order_id' => $this->sales_order_id,
            'transfer_id' => $this->transfer_id,
        ]);
    }
}

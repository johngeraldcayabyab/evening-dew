<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceLineResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        return $this->defaults($this, $request, [
            'product_id' => $this->product_id,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'subtotal' => $this->subtotal,
            'chart_of_account_id' => $this->chart_of_account_id,
            'invoice_id' => $this->invoice_id,
            'product' => $this->product,
            'chart_of_account' => $this->chartOfAccount,
            'invoice' => $this->invoice,
        ]);
    }
}

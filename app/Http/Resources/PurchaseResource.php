<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'number' => $this->number,
            'vendor_id' => $this->vendor_id,
            'vendor_reference' => $this->vendor_reference,
            'notes' => $this->notes,
            'currency_id' => $this->currency_id,
            'order_deadline' => $this->order_deadline,
            'receipt_date' => $this->receipt_date,
            'shipping_method' => $this->shipping_method,
            'purchase_representative_id' => $this->purchase_representative_id,
            'drop_ship_address_id' => $this->drop_ship_address_id,
            'payment_term_id' => $this->payment_term_id,
            'subtotal' => $this->subtotal,
            'terms_and_conditions' => $this->terms_and_conditions,
            'status' => $this->status,
            'vendor' => $this->vendor,
            'currency' => $this->currency,
            'purchase_representative' => $this->purchaseRepresentative,
            'drop_ship_address' => $this->dropShipAddress,
            'payment_term' => $this->paymentTerm,
            'purchase_lines' => PurchaseLineResource::collection($this->purchaseLines),
            'slug' => $this->$slug,
        ]);
    }
}

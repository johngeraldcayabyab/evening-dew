<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'contact_id' => $this->contact_id,
            'contact' => new ContactResource($this->contact),
            'invoicing_address_id' => $this->invoicing_address_id,
            'invoicing_address' => new AddressResource($this->invoicingAddress),
            'delivery_address_id' => $this->delivery_address_id,
            'delivery_address' => new AddressResource($this->deliveryAddress),
            'payment_term_id' => $this->payment_term_id,
            'payment_term' => new PaymentTermResource($this->paymentTerm),
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

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
            'customer_id' => $this->customer_id,
            'customer' => new ContactResource($this->customer),
            'invoice_address_id' => $this->invoice_address_id,
            'invoice_address' => new AddressResource($this->invoiceAddress),
            'delivery_address_id' => $this->delivery_address_id,
            'delivery_address' => new AddressResource($this->deliveryAddress),
            'payment_term_id' => $this->payment_term_id,
            'payment_term' => $this->payment_term_id ? new PaymentTermResource($this->paymentTerm) : null,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
        ];
    }
}

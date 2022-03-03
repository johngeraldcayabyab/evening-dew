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
            'expiration_date' => $this->expiration_date,
            'quotation_date' => $this->quotation_date,
            'payment_term_id' => $this->payment_term_id,
            'salesperson_id' => $this->salesperson_id,
            'salesperson' => new UserResource($this->salesperson),
            'customer_reference' => $this->customer_reference,
            'payment_term' => new PaymentTermResource($this->paymentTerm),
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'shipping_policy' => $this->shipping_policy,
            'sales_order_lines' => SalesOrderLineResource::collection($this->salesOrderLines)
        ];
    }
}

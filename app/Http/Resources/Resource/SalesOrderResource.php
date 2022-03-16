<?php

namespace App\Http\Resources\Resource;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, [
            'number' => $this->number,
            'customer_id' => $this->customer_id,
            'invoice_address_id' => $this->invoice_address_id,
            'delivery_address_id' => $this->delivery_address_id,
            'expiration_date' => $this->expiration_date,
            'quotation_date' => $this->quotation_date,
            'payment_term_id' => $this->payment_term_id,
            'salesperson_id' => $this->salesperson_id,
            'customer_reference' => $this->customer_reference,
            'shipping_policy' => $this->shipping_policy,
            'expected_delivery_date' => $this->expected_delivery_date,
            'source_document' => $this->source_document,
            'status' => $this->status,
            'customer' => new ContactResource($this->customer),
            'invoice_address' => new AddressResource($this->invoiceAddress),
            'delivery_address' => new AddressResource($this->deliveryAddress),
            'salesperson' => new UserResource($this->salesperson),
            'payment_term' => new PaymentTermResource($this->paymentTerm),
            'sales_order_lines' => SalesOrderLineResource::collection($this->salesOrderLines),
            'sales_order_transfer' => new SalesOrderTransferResource($this->salesOrderTransfer),
            'slug' => $this->$slug,
        ]);
    }
}

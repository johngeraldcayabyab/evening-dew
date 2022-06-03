<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'number' => $this->number,
            'customer_id' => $this->customer_id,
            'invoice_address' => $this->invoice_address,
            'delivery_address' => $this->delivery_address,
            'invoice_city_id' => $this->invoice_city_id,
            'delivery_city_id' => $this->delivery_city_id,
            'phone' => $this->phone,
            'expiration_date' => $this->expiration_date,
            'quotation_date' => $this->quotation_date,
            'payment_term_id' => $this->payment_term_id,
            'salesperson_id' => $this->salesperson_id,
            'source_id' => $this->source_id,
            'customer_reference' => $this->customer_reference,
            'shipping_policy' => $this->shipping_policy,
            'expected_shipping_date' => $this->expected_shipping_date,
            'source_document' => $this->source_document,
            'status' => $this->status,
            'notes' => $this->notes,
            'shipping_method' => $this->shipping_method,
            'customer' => new ContactResource($this->customer),
            'invoice_city' => new CityResource($this->invoiceCity),
            'delivery_city' => new CityResource($this->deliveryCity),
            'salesperson' => new UserResource($this->salesperson),
            'source' => new SourceResource($this->source),
            'payment_term' => new PaymentTermResource($this->paymentTerm),
            'sales_order_lines' => SalesOrderLineResource::collection($this->salesOrderLines),
            'sales_order_transfer' => new SalesOrderTransferResource($this->salesOrderTransfer),
            'slug' => $this->$slug,
        ]);
    }
}

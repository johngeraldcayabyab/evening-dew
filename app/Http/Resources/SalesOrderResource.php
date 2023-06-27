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
            'pricelist_id' => $this->pricelist_id,
            'invoice_address' => $this->invoice_address,
            'delivery_address' => $this->delivery_address,
            'invoice_city_id' => $this->invoice_city_id,
            'delivery_city_id' => $this->delivery_city_id,
            'invoice_phone' => $this->invoice_phone,
            'delivery_phone' => $this->delivery_phone,
            'expiration_date' => $this->expiration_date,
            'quotation_date' => $this->quotation_date,
            'payment_term_id' => $this->payment_term_id,
            'salesperson_id' => $this->salesperson_id,
            'source_id' => $this->source_id,
            'courier_id' => $this->courier_id,
            'customer_reference' => $this->customer_reference,
            'shipping_policy' => $this->shipping_policy,
            'shipping_date' => $this->shipping_date,
            'source_document' => $this->source_document,
            'status' => $this->status,
            'notes' => $this->notes,
            'shipping_method' => $this->shipping_method,
            'select_time' => $this->select_time,
            'vehicle_type' => $this->vehicle_type,
            'discount_type' => $this->discount_type,
            'discount_rate' => $this->discount_rate,
            'subtotal' => $this->subtotal,
            'customer' => $this->customer,
            'courier' => $this->courier,
            'invoice_city' => $this->invoiceCity,
            'delivery_city' => $this->deliveryCity,
            'salesperson' => $this->salesperson,
            'source' => $this->source,
            'payment_term' => $this->paymentTerm,
            'sales_order_lines' => SalesOrderLineResource::collection($this->salesOrderLines),
            'slug' => $this->$slug,
        ]);
    }
}

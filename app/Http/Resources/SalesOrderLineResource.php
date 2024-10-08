<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesOrderLineResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $product = $this->product;
        return $this->defaults($this, $request, [
            'product_id' => $this->product_id,
            'product_name' => $product->name,
            'avatar' => $product->avatar ? asset("storage/images/" . $product->avatar) : null,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'measurement_id' => $this->measurement_id,
            'unit_price' => $this->unit_price,
            'discounted_unit_price' => $this->discounted_unit_price,
            'discount' => $this->discount,
            'taxable_amount' => $this->taxable_amount,
            'tax_amount' => $this->tax_amount,
            'tax_id' => $this->tax_id,
            'subtotal' => $this->subtotal,
            'shipping_date' => $this->shipping_date,
            'sales_order_id' => $this->sales_order_id,
            'product' => $this->product,
            'discount_type' => $this->discount_type,
            'discount_rate' => $this->discount_rate,
            'sales_order' => $this->salesOrder,
        ]);
    }
}

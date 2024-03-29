<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'number' => $this->number,
            'customer_id' => $this->customer_id,
            'payment_reference' => $this->payment_reference,
            'invoice_date' => $this->invoice_date,
            'due_date' => $this->due_date,
            'payment_term_id' => $this->payment_term_id,
            'journal_id' => $this->journal_id,
            'currency_id' => $this->currency_id,
            'customer_reference' => $this->customer_reference,
            'salesperson_id' => $this->salesperson_id,
            'bank_id' => $this->bank_id,
            'post_automatically' => $this->post_automatically,
            'to_check' => $this->to_check,
            'source_document' => $this->source_document,
            'amount_due' => $this->amount_due,
            'status' => $this->status,
            'customer' => $this->customer,
            'journal' => $this->journal,
            'currency' => $this->currency,
            'salesperson' => $this->salesperson,
            'bank' => $this->bank,
            'invoice_lines' => InvoiceLineResource::collection($this->invoicelines),
            'slug' => $this->$slug,
        ]);
    }
}

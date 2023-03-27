<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class BillResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'number' => $this->number,
            'vendor_id' => $this->vendor_id,
            'bill_reference' => $this->bill_reference,
            'payment_reference' => $this->payment_reference,
            'bank_id' => $this->bank_id,
            'auto_complete_sequence' => $this->auto_complete_sequence,
            'bill_date' => $this->bill_date,
            'accounting_date' => $this->accounting_date,
            'due_date' => $this->due_date,
            'payment_term_id' => $this->payment_term_id,
            'journal_id' => $this->journal_id,
            'currency_id' => $this->currency_id,
            'post_automatically' => $this->post_automatically,
            'to_check' => $this->to_check,
            'status' => $this->status,
            'total' => $this->total,
            'terms_and_conditions' => $this->terms_and_conditions,
            'vendor' => $this->vendor,
            'bank' => $this->bank,
            'payment_term' => $this->payment_term,
            'journal' => $this->journal,
            'currency' => $this->currency,
//            'invoice_lines' => InvoiceLineResource::collection($this->invoicelines),
            'slug' => $this->$slug,
        ]);
    }
}

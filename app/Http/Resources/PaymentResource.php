<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'number' => $this->number,
            'payment_type' => $this->payment_type,
            'partner_type' => $this->partner_type,
            'contact_id' => $this->contact_id,
            'destination_account_id' => $this->destination_account_id,
            'is_internal_transfer' => $this->is_internal_transfer,
            'amount' => $this->amount,
            'currency_id' => $this->currency_id,
            'payment_date' => $this->payment_date,
            'memo' => $this->memo,
            'journal_id' => $this->journal_id,
            'bank_account_id' => $this->bank_account_id,
            'notes' => $this->notes,
            'contact' => new ContactResource($this->contact),
            'destination_account' => new ChartOfAccountResource($this->destinationAccount),
            'currency' => new CurrencyResource($this->currency),
            'journal' => new JournalResource($this->journal),
            'bank_account' => new BankAccountResource($this->bankAccount),
            'slug' => $this->$slug,
        ]);
    }
}

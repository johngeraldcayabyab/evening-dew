<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class JournalResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'type' => $this->type,
            'dedicated_credit_note_sequence' => $this->dedicated_credit_note_sequence,
            'short_code' => $this->short_code,
            'currency_id' => $this->currency_id,
            'incoming_payment_method_manual' => $this->incoming_payment_method_manual,
            'incoming_payment_method_electronic' => $this->incoming_payment_method_electronic,
            'outgoing_payment_method_manual' => $this->outgoing_payment_method_manual,
            'currency' => new CurrencyResource($this->currency),
            'slug' => $this->$slug,
        ]);
    }
}

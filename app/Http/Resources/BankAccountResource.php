<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class BankAccountResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'account_number' => $this->account_number,
            'account_holder_id' => $this->account_holder_id,
            'bank_id' => $this->bank_id,
            'currency_id' => $this->currency_id,
            'account_holder_name' => $this->account_holder_name,
            'account_holder' => new ContactResource($this->accountHolder),
            'bank' => new BankResource($this->bank),
            'currency' => new CurrencyResource($this->currency),
            'slug' => $this->$slug,
        ]);
    }
}

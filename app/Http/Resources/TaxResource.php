<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class TaxResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'type' => $this->type,
            'scope' => $this->scope,
            'computation' => $this->computation,
            'amount' => $this->amount,
            'label_on_invoices' => $this->label_on_invoices,
            'included_in_price' => $this->included_in_price,
            'chart_of_account_id' => $this->chart_of_account_id,
            'chart_of_account' => new ChartOfAccountResource($this->chartOfAccount),
            'slug' => $this->$slug,
        ]);
    }
}

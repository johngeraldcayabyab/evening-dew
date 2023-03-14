<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class ChartOfAccountResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'code' => $this->code,
            'name' => $this->name,
            'type' => $this->type,
            'currency_id' => $this->currency_id,
            'deprecated' => $this->deprecated,
            'allow_reconciliation' => $this->allow_reconciliation,
            'currency' => new CurrencyResource($this->currency),
            'slug' => $this->$slug,
        ]);
    }
}

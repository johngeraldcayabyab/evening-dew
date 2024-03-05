<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesSettingResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'validate_transfer_on_validate' => $this->validate_transfer_on_validate,
            'company_id' => $this->company_id,
            'company' => $this->company,
            'slug' => $this->$slug,
        ]);
    }
}

<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, $request, [
            'name' => $this->name,
            'email' => $this->email,
            'tax_registry' => $this->tax_registry,
            'avatar' => $this->avatar ? asset("storage/images/" . $this->avatar) : null,
            'contact_id' => $this->contact_id,
            'is_default' => $this->is_default,
            'contact' => new ContactResource($this->contact),
            'slug' => $this->$slug,
        ]);
    }
}

<?php

namespace App\Http\Resources;

use App\Traits\ResourceHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    use ResourceHelper;

    public function toArray($request)
    {
        $slug = $this->slug();
        return $this->defaults($this, [
            'label' => $this->label,
            'url' => $this->url,
            'slug' => $this->$slug,
        ]);
    }
}

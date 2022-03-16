<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class OptionResource extends JsonResource
{
    public function toArray($request)
    {
        $label = $this->slug();
        if (Str::contains($label, 'parent')) {
            $label = $this->getWithParents(explode('.', $label)[1]);
        } else {
            $label = $this->$label;
        }
        return [
            'value' => $this->id,
            'label' => $label,
        ];
    }
}

<?php

namespace App\Http\Resources\Single;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'label' => $this->label,
            'url' => $this->url
        ];
    }
}

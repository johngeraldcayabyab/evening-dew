<?php

namespace App\Http\Resources\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        return [
            'id' => $this->id,
            'label' => $this->label,
            'url' => $this->url,
            'created_at' => $this->created_at->format('m/d/Y h:i:s A'),
            'slug' => $this->$slug,
        ];
    }
}

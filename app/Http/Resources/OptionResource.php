<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class OptionResource extends JsonResource
{
    public function toArray($request)
    {
        $slug = $this->slug();
        if (Str::contains($slug, 'parent')) {
            $slug = $this->getWithParents(explode('.', $slug)[1]);
        } else {
            $slug = $this->$slug;
        }
        return [
            'id' => $this->id,
            'slug' => $slug,
        ];
    }
}

<?php

namespace App\Http\Resources\Slug;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class AddressSlugResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'key' => Str::uuid(),
            'slug' => "$this->address_name"
        ];
    }
}

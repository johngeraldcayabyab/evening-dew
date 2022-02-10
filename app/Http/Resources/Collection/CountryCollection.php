<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\CountryResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CountryCollection extends ResourceCollection
{
    public $collects = CountryResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

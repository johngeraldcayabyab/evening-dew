<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\LocationResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class LocationCollection extends ResourceCollection
{
    public $collects = LocationResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

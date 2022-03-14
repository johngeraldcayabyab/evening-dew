<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\MaterialResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MaterialCollection extends ResourceCollection
{
    public $collects = MaterialResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

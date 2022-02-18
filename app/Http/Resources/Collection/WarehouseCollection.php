<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\WarehouseResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class WarehouseCollection extends ResourceCollection
{
    public $collects = WarehouseResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\SalesOrderLineResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SalesOrderLineCollection extends ResourceCollection
{
    public $collects = SalesOrderLineResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}

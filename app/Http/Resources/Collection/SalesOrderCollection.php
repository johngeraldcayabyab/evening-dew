<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\SalesOrderResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SalesOrderCollection extends ResourceCollection
{
    public $collects = SalesOrderResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

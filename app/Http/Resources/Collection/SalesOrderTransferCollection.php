<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\SalesOrderTransferResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SalesOrderTransferCollection extends ResourceCollection
{
    public $collects = SalesOrderTransferResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}

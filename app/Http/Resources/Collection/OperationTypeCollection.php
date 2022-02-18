<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\OperationTypeResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OperationTypeCollection extends ResourceCollection
{
    public $collects = OperationTypeResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

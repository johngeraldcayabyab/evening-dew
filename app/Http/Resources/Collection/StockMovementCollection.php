<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\StockMovementResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class StockMovementCollection extends ResourceCollection
{
    public $collects = StockMovementResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

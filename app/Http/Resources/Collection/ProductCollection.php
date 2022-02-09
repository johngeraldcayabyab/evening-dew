<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\ProductResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    public $collects = ProductResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\ProductCategoryResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCategoryCollection extends ResourceCollection
{
    public $collects = ProductCategoryResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\MenuResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MenuCollection extends ResourceCollection
{
    public $collects = MenuResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

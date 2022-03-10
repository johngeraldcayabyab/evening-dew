<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\AppMenuResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AppMenuCollection extends ResourceCollection
{
    public $collects = AppMenuResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

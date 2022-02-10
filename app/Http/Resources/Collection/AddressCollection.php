<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\AddressResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AddressCollection extends ResourceCollection
{
    public $collects = AddressResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

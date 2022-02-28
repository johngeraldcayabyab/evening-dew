<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\TransferResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TransferCollection extends ResourceCollection
{
    public $collects = TransferResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

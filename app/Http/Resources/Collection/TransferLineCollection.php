<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\TransferLineResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TransferLineCollection extends ResourceCollection
{
    public $collects = TransferLineResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}

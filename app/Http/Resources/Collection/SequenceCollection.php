<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\SequenceResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SequenceCollection extends ResourceCollection
{
    public $collects = SequenceResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }
}

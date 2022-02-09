<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\CurrencyResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CurrencyCollection extends ResourceCollection
{
    public $collects = CurrencyResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

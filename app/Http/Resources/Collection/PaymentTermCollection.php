<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\PaymentTermResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PaymentTermCollection extends ResourceCollection
{
    public $collects = PaymentTermResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

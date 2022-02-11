<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\ContactResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ContactCollection extends ResourceCollection
{
    public $collects = ContactResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

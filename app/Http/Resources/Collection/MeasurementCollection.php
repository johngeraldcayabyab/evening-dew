<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\MeasurementResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MeasurementCollection extends ResourceCollection
{
    public $collects = MeasurementResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

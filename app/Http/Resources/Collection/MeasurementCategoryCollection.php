<?php

namespace App\Http\Resources\Collection;

use App\Http\Resources\Resource\MeasurementCategoryResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MeasurementCategoryCollection extends ResourceCollection
{
    public $collection = MeasurementCategoryResource::class;

    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}

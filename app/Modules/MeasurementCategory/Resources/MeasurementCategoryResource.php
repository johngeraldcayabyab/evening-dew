<?php

namespace App\Modules\MeasurementCategory\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MeasurementCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}

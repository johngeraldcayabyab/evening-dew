<?php

namespace App\Observers;

use App\Models\Location;
use Illuminate\Validation\ValidationException;

class LocationObserver
{
    public function creating(Location $location)
    {
        $this->setDefaults($location);
    }

    public function updating(Location $location)
    {
        if ($location->parent_location_id === $location->id) {
            throw ValidationException::withMessages(['parent_location_id' => 'Recursion detected']);
        }
        $this->setDefaults($location);
    }

    public function setDefaults($model)
    {
        $modelArray = $model->toArray();
        if (!isset($modelArray['type'])) {
            $model->type = Location::INTERNAL;
        }
    }
}

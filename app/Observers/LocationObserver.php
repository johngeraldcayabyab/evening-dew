<?php

namespace App\Observers;

use App\Models\Location;
use Illuminate\Validation\ValidationException;

class LocationObserver
{
    public function creating(Location $location)
    {
        $this->checkInternalTypes($location);
        $this->setDefaults($location);
    }

    public function updating(Location $location)
    {
        $this->checkInternalTypes($location);
        if ($location->parent_location_id === $location->id) {
            throw ValidationException::withMessages(['parent_location_id' => 'Recursion detected']);
        }
        $this->setDefaults($location);
    }

    public function checkInternalTypes(Location $location)
    {
        if ($location->type === Location::INTERNAL) {
            if ($location->parentLocation()->exists()) {
                if ($location->parentLocation->type !== Location::VIEW) {
                    throw ValidationException::withMessages(['parent_location_id' => 'Parent location for internal types should be View types']);
                }
            }
        }
    }

    public function setDefaults($model)
    {
        $modelArray = $model->toArray();
        if (!isset($modelArray['type'])) {
            $model->type = Location::INTERNAL;
        }
    }
}

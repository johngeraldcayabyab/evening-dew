<?php

namespace App\Observers;

use App\Models\Warehouse;
use Illuminate\Validation\ValidationException;

class WarehouseObserver
{
    public function creating(Warehouse $warehouse)
    {
        $this->setDefaults($warehouse);
    }

    public function updating(Warehouse $warehouse)
    {
        if (!$warehouse->is_default) {
            $currentDefault = Warehouse::where('id', $warehouse->id)->first();
            if ($currentDefault->is_default) {
                throw ValidationException::withMessages(['is_default' => 'There should be one default']);
            }
        }
        $this->setDefaults($warehouse);
    }

    public function setDefaults($warehouse)
    {
        $modelArray = $warehouse->toArray();
        if (!isset($modelArray['manufacture_to_resupply'])) {
            $warehouse->manufacture_to_resupply = Warehouse::DEFAULT_MANUFACTURE_TO_RESUPPLY;
        }
        if (!isset($modelArray['buy_to_resupply'])) {
            $warehouse->buy_to_resupply = Warehouse::DEFAULT_BUY_TO_RESUPPLY;
        }
        if ($warehouse->is_default) {
            $previousDefault = Warehouse::where('is_default', true)
                ->where('id', '!=', $warehouse->id)
                ->first();
            if ($previousDefault) {
                $previousDefault->is_default = false;
                $previousDefault->saveQuietly();
            }
        }
    }
}

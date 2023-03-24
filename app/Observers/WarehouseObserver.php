<?php

namespace App\Observers;

use App\Models\Warehouse;

class WarehouseObserver
{
    public function creating(Warehouse $warehouse)
    {
        $this->setDefaults($warehouse);
    }

    public function updating(Warehouse $warehouse)
    {
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
                $previousDefault->save();
            }
        }
    }
}

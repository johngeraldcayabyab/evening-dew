<?php

namespace App\Observers;

use App\Events\WarehouseCreatedEvent;
use App\Models\Warehouse;

class WarehouseObserver
{
    public function creating(Warehouse $warehouse)
    {
        $this->setDefaults($warehouse);
    }

    public function created(Warehouse $warehouse)
    {
        WarehouseCreatedEvent::dispatch($warehouse);
    }

    public function updating(Warehouse $warehouse)
    {
        $this->setDefaults($warehouse);
    }

    public function setDefaults($model)
    {
        $modelArray = $model->toArray();
        if (!isset($modelArray['manufacture_to_resupply'])) {
            $model->manufacture_to_resupply = Warehouse::DEFAULT_MANUFACTURE_TO_RESUPPLY;
        }
        if (!isset($modelArray['buy_to_resupply'])) {
            $model->buy_to_resupply = Warehouse::DEFAULT_BUY_TO_RESUPPLY;
        }
    }
}

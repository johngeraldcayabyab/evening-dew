<?php

namespace App\Observers;

use App\Events\WarehouseCreatedEvent;
use App\Models\Warehouse;

class WarehouseObserver
{
    public function created(Warehouse $warehouse)
    {
        WarehouseCreatedEvent::dispatch($warehouse);
    }
}

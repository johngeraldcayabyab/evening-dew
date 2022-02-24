<?php

namespace App\Observers;

use App\Events\WarehouseCreated;
use App\Models\Warehouse;

class WarehouseObserver
{
    public function created(Warehouse $warehouse)
    {
        WarehouseCreated::dispatch($warehouse);
    }
}

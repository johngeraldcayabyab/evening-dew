<?php

namespace App\Observers;

use App\Models\SalesOrderLine;

class SalesOrderLineObserver
{
    public function creating(SalesOrderLine $salesOrderLine)
    {
        info('IS CREATING TRIGGERED');
    }

    public function updating(SalesOrderLine $salesOrderLine)
    {
        info('IS UPDATING TRIGGERED');
    }
}

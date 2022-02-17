<?php

namespace App\Observers;

use App\Models\SalesOrderLine;

class SalesOrderLineObserver
{
    public function creating(SalesOrderLine $salesOrderLine)
    {
        $salesOrderLine->subtotal = $salesOrderLine->quantity * $salesOrderLine->unit_price;
    }
}

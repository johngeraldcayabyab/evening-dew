<?php

namespace App\Observers;

use App\Models\SalesOrder;
use App\Models\Sequence;

class SalesOrderObserver
{
    public function created(SalesOrder $model)
    {
        $salesOrderSequence = Sequence::salesOrderSequence();
        $salesOrderSequence->next_number = $salesOrderSequence->next_number + $salesOrderSequence->step;
        $salesOrderSequence->save();
    }

    public function updated(SalesOrder $model)
    {

    }
}

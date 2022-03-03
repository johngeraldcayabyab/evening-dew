<?php

namespace App\Observers;

use App\Models\GlobalSetting;
use App\Models\SalesOrder;

class SalesOrderObserver
{
    public function created(SalesOrder $model)
    {
        GlobalSetting::latestFirst()->salesOrderDefaultSequence;
        $salesOrderDefaultSequence = GlobalSetting::latestFirst()->salesOrderDefaultSequence;
        if ($salesOrderDefaultSequence) {
            $salesOrderDefaultSequence->next_number = $salesOrderDefaultSequence->next_number + $salesOrderDefaultSequence->step;
            $salesOrderDefaultSequence->save();
        }
        if (!$model->salesperson_id) {
            $model->salesperson_id = auth()->user()->id;
        }
    }

    public function updated(SalesOrder $model)
    {
        if (!$model->salesperson_id) {
            $model->salesperson_id = auth()->user()->id;
        }
    }
}

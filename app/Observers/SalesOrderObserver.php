<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\GlobalSetting;
use App\Models\SalesOrder;
use App\Models\Transfer;
use Carbon\Carbon;

class SalesOrderObserver
{
    public function creating(SalesOrder $model)
    {
        $this->setDefaults($model);
    }

    public function created(SalesOrder $model)
    {
        GlobalSetting::latestFirst()->salesOrderDefaultSequence;
        $salesOrderDefaultSequence = GlobalSetting::latestFirst()->salesOrderDefaultSequence;
        if ($salesOrderDefaultSequence) {
            $salesOrderDefaultSequence->next_number = $salesOrderDefaultSequence->next_number + $salesOrderDefaultSequence->step;
            $salesOrderDefaultSequence->save();
        }
    }

    public function updating(SalesOrder $model)
    {
        $this->setDefaults($model);
    }

    public function setDefaults($model)
    {
        if ($model->expiration_date) {
            $model->expiration_date = Carbon::parse($model->expiration_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        $model->quotation_date = Carbon::parse($model->quotation_date)->format(SystemSetting::DATE_TIME_FORMAT);
        if (!$model->salesperson_id) {
            $model->salesperson_id = auth()->user()->id;
        }
        if($model->expected_delivery_date){
            $model->expected_delivery_date = Carbon::parse($model->expected_delivery_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        if (!$model->shipping_policy) {
            $model->shipping_policy = Transfer::AS_SOON_AS_POSSIBLE;
        }
    }
}

<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\GlobalSetting;
use App\Models\SalesOrder;
use App\Models\Sequence;
use App\Models\Transfer;
use Carbon\Carbon;

class SalesOrderObserver
{
    public function creating(SalesOrder $model)
    {
        $this->setDefaults($model);
        $this->setOrder($model);
    }

    public function updating(SalesOrder $model)
    {
        $this->setDefaults($model);
    }

    public function updated(SalesOrder $salesOrder)
    {

    }

    public function setDefaults($model)
    {
        if ($model->expiration_date) {
            $model->expiration_date = Carbon::parse($model->expiration_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }

        if ($model->quotation_date) {
            $model->quotation_date = Carbon::parse($model->quotation_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }

        if (!$model->salesperson_id) {
            if (auth()->user()) {
                $model->salesperson_id = auth()->user()->id;
            }
        }
        if ($model->shipping_date) {
            $model->shipping_date = Carbon::parse($model->shipping_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        if (!$model->shipping_policy) {
            $model->shipping_policy = Transfer::AS_SOON_AS_POSSIBLE;
        }
        if (!$model->shipping_method) {
            $model->shipping_method = Transfer::DELIVERY;
        }
    }

    public function setOrder($salesOrder)
    {
        $number = $salesOrder->number;
        $salesOrderDefaultSequence = GlobalSetting::latestFirst()->salesOrderDefaultSequence;
        if ($salesOrderDefaultSequence) {
            $prefix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $salesOrderDefaultSequence->prefix);
            $steps = $salesOrderDefaultSequence->sequence_size;
            $suffix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $salesOrderDefaultSequence->suffix);
            preg_match("/$prefix\d{" . $steps . "}$suffix$/", $number, $matches);
            if (count($matches)) {
                $salesOrder->number = Sequence::generateSalesOrderSequence();
                $salesOrderDefaultSequenceNew = GlobalSetting::latestFirst()->salesOrderDefaultSequence;
                $salesOrderDefaultSequenceNew->next_number = $salesOrderDefaultSequence->next_number + $salesOrderDefaultSequence->step;
                $salesOrderDefaultSequenceNew->save();
            }
        }
    }
}

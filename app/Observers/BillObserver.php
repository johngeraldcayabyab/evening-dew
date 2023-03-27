<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\Bill;
use App\Models\Currency;
use App\Models\Invoice;
use App\Models\Sequence;
use Carbon\Carbon;

class BillObserver
{
    public function creating(Bill $bill)
    {
        $this->setDefaults($bill);
        $this->setOrder($bill);
    }

    public function updating(Bill $bill)
    {
        $this->setDefaults($bill);
    }

    public function setDefaults($model)
    {
        if ($model->bill_date) {
            $model->bill_date = Carbon::parse($model->bill_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        if ($model->accounting_date) {
            $model->accounting_date = Carbon::parse($model->accounting_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        if ($model->due_date) {
            $model->due_date = Carbon::parse($model->due_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        if (!$model->currency_id) {
            $model->currency_id = Currency::default()->id;
        }
    }

    public function setOrder($bill)
    {
        $number = $bill->number;
        $billSequence = Sequence::where('sequence_code', 'bills.sequence')->first();
        $prefix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $billSequence->prefix);
        $suffix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $billSequence->suffix);
        $steps = $billSequence->sequence_size;
        preg_match("/$prefix\d{" . $steps . "}$suffix$/", $number, $matches);
        if (count($matches)) {
            $bill->number = Sequence::generateSequence($billSequence->id);
            $billSequence->next_number = $billSequence->next_number + $billSequence->step;
            $billSequence->save();
        }
    }
}

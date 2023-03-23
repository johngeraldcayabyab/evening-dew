<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\GlobalSetting;
use App\Models\Purchase;
use App\Models\Sequence;
use Carbon\Carbon;

class PurchaseObserver
{
    private $settings;

    public function __construct()
    {
        $this->settings = GlobalSetting::latestFirst();
    }

    public function creating(Purchase $model)
    {
        $this->setDefaults($model);
        $this->setOrder($model);
    }

    public function updating(Purchase $model)
    {
        $this->setDefaults($model);
    }

    public function updated(Purchase $model)
    {

    }

    public function setDefaults($model)
    {
        if ($model->order_deadline) {
            $model->order_deadline = Carbon::parse($model->order_deadline)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        if ($model->receipt_date) {
            $model->receipt_date = Carbon::parse($model->receipt_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        if (!$model->purchase_representative_id) {
            if (auth()->user()) {
                $model->purchase_representative_id = auth()->user()->id;
            }
        }
        if (!$model->currency_id) {
            $model->currency_id = $this->settings->accountingDefaultCurrency->id;
        }
    }

    public function setOrder($purchase)
    {
        $number = $purchase->number;
        $purchaseSequence = Sequence::where('sequence_code', 'purchase.sequence')->first();
        $prefix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $purchaseSequence->prefix);
        $steps = $purchaseSequence->sequence_size;
        $suffix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $purchaseSequence->suffix);
        preg_match("/$prefix\d{" . $steps . "}$suffix$/", $number, $matches);
        if (count($matches)) {
            $purchase->number = Sequence::generateSequence($purchaseSequence->id);
            $purchaseSequence->next_number = $purchaseSequence->next_number + $purchaseSequence->step;
            $purchaseSequence->save();
        }
    }
}

<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\GlobalSetting;
use App\Models\Purchase;
use App\Models\Sequence;
use App\Models\Transfer;
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
            $model->currency_id = $this->settings->defaultCurrency->id;
        }
    }

    public function setOrder($purchase)
    {
        $number = $purchase->number;
        $purchaseDefaultSequence = $this->settings->purchaseDefaultSequence;
        if ($purchaseDefaultSequence) {
            $prefix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $purchaseDefaultSequence->prefix);
            $steps = $purchaseDefaultSequence->sequence_size;
            $suffix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $purchaseDefaultSequence->suffix);
            preg_match("/$prefix\d{" . $steps . "}$suffix$/", $number, $matches);
            if (count($matches)) {
                $purchase->number = Sequence::generatePurchaseSequence();
                $purchaseDefaultSequenceNew = $this->settings->purchaseDefaultSequence;
                $purchaseDefaultSequenceNew->next_number = $purchaseDefaultSequence->next_number + $purchaseDefaultSequence->step;
                $purchaseDefaultSequenceNew->save();
            }
        }
    }
}

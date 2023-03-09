<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\GlobalSetting;
use App\Models\Invoice;
use App\Models\Sequence;
use Carbon\Carbon;

class InvoiceObserver
{
    private $settings;

    public function __construct()
    {
        $this->settings = GlobalSetting::latestFirst();
    }

    public function creating(Invoice $model)
    {
        $this->setDefaults($model);
        $this->setOrder($model);
    }

    public function updating(Invoice $model)
    {
        $this->setDefaults($model);
    }

    public function updated(Invoice $model)
    {

    }

    public function setDefaults($model)
    {
        if ($model->invoice_date) {
            $model->invoice_date = Carbon::parse($model->invoice_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        if ($model->due_date) {
            $model->due_date = Carbon::parse($model->due_date)->format(SystemSetting::DATE_TIME_FORMAT);
        }
        if (!$model->salesperson_id) {
            if (auth()->user()) {
                $model->salesperson_id = auth()->user()->id;
            }
        }
        if (!$model->currency_id) {
            $model->currency_id = $this->settings->defaultCurrency->id;
        }
    }

    public function setOrder($invoice)
    {
        $number = $invoice->number;
        $invoiceDefaultSequence = $this->settings->invoiceDefaultSequence;
        if ($invoiceDefaultSequence) {
            $prefix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $invoiceDefaultSequence->prefix);
            $steps = $invoiceDefaultSequence->sequence_size;
            $suffix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $invoiceDefaultSequence->suffix);
            preg_match("/$prefix\d{" . $steps . "}$suffix$/", $number, $matches);
            if (count($matches)) {
                $invoice->number = Sequence::generateInvoiceSequence();
                $invoiceDefaultSequenceNew = $this->settings->invoiceDefaultSequence;
                $invoiceDefaultSequenceNew->next_number = $invoiceDefaultSequence->next_number + $invoiceDefaultSequence->step;
                $invoiceDefaultSequenceNew->save();
            }
        }
    }
}

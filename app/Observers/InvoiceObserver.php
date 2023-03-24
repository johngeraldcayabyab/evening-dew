<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\Currency;
use App\Models\Invoice;
use App\Models\Sequence;
use Carbon\Carbon;

class InvoiceObserver
{
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
            $model->currency_id = Currency::default()->id;
        }
    }

    public function setOrder($invoice)
    {
        $number = $invoice->number;
        $invoiceSequence = Sequence::where('sequence_code', 'invoices.sequence')->first();
        $prefix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $invoiceSequence->prefix);
        $suffix = preg_replace('/([^A-Za-z0-9\s])/', '\\\\$1', $invoiceSequence->suffix);
        $steps = $invoiceSequence->sequence_size;
        preg_match("/$prefix\d{" . $steps . "}$suffix$/", $number, $matches);
        if (count($matches)) {
            $invoice->number = Sequence::generateSequence($invoiceSequence->id);
            $invoiceSequence->next_number = $invoiceSequence->next_number + $invoiceSequence->step;
            $invoiceSequence->save();
        }
    }
}

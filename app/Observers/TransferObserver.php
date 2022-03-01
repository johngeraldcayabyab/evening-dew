<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\Transfer;
use Carbon\Carbon;

class TransferObserver
{
    public function creating(Transfer $transfer)
    {
        $transfer->scheduled_date = Carbon::parse($transfer->scheduled_date)->format(SystemSetting::DATE_TIME_FORMAT);
    }

    public function updating(Transfer $transfer)
    {
        $transfer->scheduled_date = Carbon::parse($transfer->scheduled_date)->format(SystemSetting::DATE_TIME_FORMAT);
    }
}

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
        if (!$transfer->shipping_policy) {
            $transfer->shipping_policy = Transfer::AS_SOON_AS_POSSIBLE;
        }
        if (!$transfer->responsible_id) {
            $transfer->responsible_id = auth()->user()->id;
        }
    }

    public function updating(Transfer $transfer)
    {
        $transfer->scheduled_date = Carbon::parse($transfer->scheduled_date)->format(SystemSetting::DATE_TIME_FORMAT);
        if (!$transfer->shipping_policy) {
            $transfer->shipping_policy = Transfer::AS_SOON_AS_POSSIBLE;
        }
        if (!$transfer->responsible_id) {
            $transfer->responsible_id = auth()->user()->id;
        }
    }
}

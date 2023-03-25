<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\Location;
use App\Models\OperationType;
use App\Models\Sequence;
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
            if (auth()->user()) {
                $transfer->responsible_id = auth()->user()->id;
            }
        }
        $operationType = OperationType::find($transfer->operation_type_id);
        $transferSequence = $operationType->referenceSequence;
        if ($transferSequence) {
            $transfer->reference = Sequence::generateSequence($transferSequence->id);
            $transferSequence->next_number = $transferSequence->next_number + $transferSequence->step;
            $transferSequence->save();
        }
        if ($operationType->type === OperationType::RECEIPT) {
            if (!$transfer->source_location_id) {
                if ($operationType->default_source_location_id) {
                    $transfer->source_location_id = $operationType->default_source_location_id;
                } else {
                    $transfer->source_location_id = Location::where('type', Location::VENDOR)->first()->id;
                }
            }
        } elseif ($operationType->type === OperationType::DELIVERY) {
            if (!$transfer->destination_location_id) {
                if ($operationType->default_destination_location_id) {
                    $transfer->destination_location_id = $operationType->default_destination_location_id;
                } else {
                    $transfer->destination_location_id = Location::where('type', Location::CUSTOMER)->first()->id;
                }
            }
        }
    }

    public function created(Transfer $transfer)
    {

    }

    public function updating(Transfer $transfer)
    {
        $transfer->scheduled_date = Carbon::parse($transfer->scheduled_date)->format(SystemSetting::DATE_TIME_FORMAT);
        if (!$transfer->shipping_policy) {
            $transfer->shipping_policy = Transfer::AS_SOON_AS_POSSIBLE;
        }
        if (!$transfer->responsible_id) {
            if (auth()->user()) {
                $transfer->responsible_id = auth()->user()->id;
            }
        }
    }

    public function updated(Transfer $transfer)
    {

    }
}

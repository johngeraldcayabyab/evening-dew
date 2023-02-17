<?php

namespace App\Jobs;

use App\Events\TransferValidated;
use App\Models\Transfer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ValidateAllDraftTransfersJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $draftTransfers = Transfer::whereStatus(Transfer::DRAFT)->get();
        foreach ($draftTransfers as $draftTransfer) {
            $draftTransfer->status = Transfer::DONE;
            $draftTransfer->save();
            TransferValidated::dispatch($draftTransfer);
        }
    }
}

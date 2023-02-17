<?php

namespace App\Events;

use App\Models\Transfer;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TransferValidated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $transfer;

    public function __construct(Transfer $transfer)
    {
        $this->transfer = $transfer;
    }
}

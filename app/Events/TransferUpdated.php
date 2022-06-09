<?php

namespace App\Events;

use App\Models\Transfer;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TransferUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $transfer;

    public function __construct(Transfer $transfer)
    {
        $this->transfer = $transfer;
    }
}

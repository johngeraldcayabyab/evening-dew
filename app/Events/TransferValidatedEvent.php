<?php

namespace App\Events;

use App\Models\SalesOrder;
use App\Models\Transfer;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TransferValidatedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $transfer;

    public function __construct(Transfer $transfer)
    {
        $this->transfer = $transfer;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}

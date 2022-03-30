<?php

namespace App\Events;

use App\Models\Adjustment;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AdjustmentValidatedEvent implements ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $adjustment;

    public function __construct(Adjustment $adjustment)
    {
        $this->adjustment = $adjustment;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}

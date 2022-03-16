<?php

namespace App\Events;

use App\Models\Material;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProductHasMaterialEvent implements ShouldBroadcast, ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $material;

    public function __construct(Material $material)
    {
        $this->material = $material;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}

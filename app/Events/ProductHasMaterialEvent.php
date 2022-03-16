<?php

namespace App\Events;

use App\Models\Material;
use App\Models\OperationType;
use App\Models\Transfer;
use App\Models\TransferLine;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProductHasMaterialEvent implements ShouldBroadcast, ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $transfer;
    public $operationType;
    public $material;
    public $demand;

    public function __construct(Transfer $transfer, OperationType $operationType, Material $material, $demand)
    {
        $this->transfer = $transfer;
        $this->operationType = $operationType;
        $this->material = $material;
        $this->demand = $demand;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}

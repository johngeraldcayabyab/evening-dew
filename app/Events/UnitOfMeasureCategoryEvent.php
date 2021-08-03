<?php

namespace App\Events;

use App\Models\UnitOfMeasureCategory;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UnitOfMeasureCategoryEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $model;

    public function __construct(UnitOfMeasureCategory $model)
    {
        $this->model = $model;
    }

    public function broadcastOn()
    {
        return new Channel('units_of_measure_categories');
    }
}

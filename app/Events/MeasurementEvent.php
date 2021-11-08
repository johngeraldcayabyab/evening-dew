<?php

namespace App\Events;

use App\Models\Measurement;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MeasurementEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $model;
    public $method;

    public function __construct(Measurement $model, $method)
    {
        $this->model = $model;
        $this->method = $method;
    }

    public function broadcastOn()
    {
        return new Channel('measurements');
    }
}

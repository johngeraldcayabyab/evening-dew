<?php

namespace App\Events;

use App\Models\Measurement;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MeasurementEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $model;
    public $method;

    public function __construct(Measurement $model, $method)
    {
        info('is broadcast');
        $this->model = $model;
        $this->method = $method;
    }

    public function broadcastOn()
    {
        return new Channel('measurements_channel');
    }

    public function broadcastAs()
    {
        return 'measurements_event';
    }
}

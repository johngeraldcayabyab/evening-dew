<?php

namespace App\Modules\Measurement\Events;

use App\Modules\Measurement\Models\Measurement;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MeasurementCrudEvent
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

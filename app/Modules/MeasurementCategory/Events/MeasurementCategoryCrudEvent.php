<?php

namespace App\Modules\MeasurementCategory\Events;

use App\Modules\MeasurementCategory\Models\MeasurementCategory;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MeasurementCategoryCrudEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $model;
    public $method;

    public function __construct(MeasurementCategory $model, $method)
    {
        $this->model = $model;
        $this->method = $method;
    }

    public function broadcastOn()
    {
        return new Channel('measurement_categories');
    }
}

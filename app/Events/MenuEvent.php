<?php

namespace App\Events;

use App\Models\Menu;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MenuEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $model;
    public $method;

    public function __construct(Menu $model, $method)
    {
        $this->model = $model;
        $this->method = $method;
    }

    public function broadcastOn()
    {
        return new Channel('menus');
    }
}

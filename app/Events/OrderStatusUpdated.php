<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $foo = 'bar';

    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function handle()
    {
    }

    public function broadcastOn()
    {
        info($this->user);
        return new Channel('orders');
//        return new PrivateChannel('channel-name');
    }
}

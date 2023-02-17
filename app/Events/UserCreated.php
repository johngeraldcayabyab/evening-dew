<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $data;

    public function __construct(User $user, $data = [])
    {
        $this->user = $user;
        $this->data = $data;
    }
}

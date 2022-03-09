<?php

namespace App\Events;

use App\Models\Contact;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ContactUpsertEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $contact;
    public $data;

    public function __construct(Contact $contact, $data = [])
    {
        $this->contact = $contact;
        $this->data = $data;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}

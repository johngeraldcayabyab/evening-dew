<?php

namespace App\Events;

use App\Models\Contact;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ContactUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $contact;
    public $data;

    public function __construct(Contact $contact, $data = [])
    {
        $this->contact = $contact;
        $this->data = $data;
    }
}

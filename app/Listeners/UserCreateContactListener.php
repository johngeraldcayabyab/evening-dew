<?php

namespace App\Listeners;

use App\Events\ContactCreatedEvent;
use App\Events\UserCreatedEvent;
use App\Models\Contact;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserCreateContactListener implements ShouldQueue
{
    public function handle(UserCreatedEvent $event)
    {
        $user = $event->user;
        $contact = Contact::create([
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
        ]);
        ContactCreatedEvent::dispatch($contact);
    }
}

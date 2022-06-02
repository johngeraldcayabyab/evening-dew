<?php

namespace App\Listeners;

use App\Events\ContactCreatedEvent;
use App\Events\ContactUpdatedEvent;
use App\Events\UserUpdatedEvent;
use App\Models\Contact;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserUpdateContactListener implements ShouldQueue
{
    public function handle(UserUpdatedEvent $event)
    {
        $user = $event->user;
        $contact = Contact::where('email', $user->email)->first();
        $contact->update([
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
        ]);
        ContactUpdatedEvent::dispatch($contact);
    }
}

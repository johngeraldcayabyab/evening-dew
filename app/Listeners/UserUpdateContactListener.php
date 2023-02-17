<?php

namespace App\Listeners;

use App\Events\ContactCreated;
use App\Events\ContactUpdated;
use App\Events\UserUpdated;
use App\Models\Contact;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserUpdateContactListener implements ShouldQueue
{
    public function handle(UserUpdated $event)
    {
        $user = $event->user;
        $contact = Contact::where('email', $user->email)->first();
        $contact->update([
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
        ]);
        ContactUpdated::dispatch($contact);
    }
}

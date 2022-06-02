<?php

namespace App\Listeners;

use App\Events\ContactUpdatedEvent;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactUpdateUserListener implements ShouldQueue
{
    public function handle(ContactUpdatedEvent $event)
    {
        $contact = $event->contact;
        $user = User::where('email', $contact->email)->first();
        $user->update([
            'name' => $contact->name,
            'email' => $contact->email,
            'avatar' => $contact->avatar,
        ]);
    }
}

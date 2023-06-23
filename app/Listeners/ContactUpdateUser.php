<?php

namespace App\Listeners;

use App\Events\ContactUpdated;

class ContactUpdateUser
{
    public function handle(ContactUpdated $event)
    {
        $contact = $event->contact;
        $user = $contact->user;
        if ($user) {
            $user->update([
                'name' => $contact->name,
                'email' => $contact->email,
                'avatar' => $contact->avatar,
            ]);
        }
    }
}

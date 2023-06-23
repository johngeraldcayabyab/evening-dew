<?php

namespace App\Listeners;

use App\Events\ContactUpdated;
use App\Events\UserUpdated;

class UserUpdateContact
{
    public function handle(UserUpdated $event)
    {
        $user = $event->user;
        $contact = $user->contact;
        if ($contact) {
            $contact->update([
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
            ]);
            ContactUpdated::dispatch($contact);
        }
    }
}

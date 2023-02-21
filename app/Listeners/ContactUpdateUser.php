<?php

namespace App\Listeners;

use App\Events\ContactUpdated;
use App\Models\User;

class ContactUpdateUser
{
    public function handle(ContactUpdated $event)
    {
        $contact = $event->contact;
        $user = User::where('email', $contact->email)->first();
        if ($user) {
            $user->update([
                'name' => $contact->name,
                'email' => $contact->email,
                'avatar' => $contact->avatar,
            ]);
        }
    }
}

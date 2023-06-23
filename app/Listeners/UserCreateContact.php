<?php

namespace App\Listeners;

use App\Events\ContactCreated;
use App\Events\UserCreated;
use App\Models\Contact;

class UserCreateContact
{
    public function handle(UserCreated $event)
    {
        $user = $event->user;
        $contact = Contact::create([
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
        ]);
        $user->contact_id = $contact->id;
        $user->save();
        ContactCreated::dispatch($contact);
    }
}

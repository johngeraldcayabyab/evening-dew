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
        ContactCreated::dispatch($contact);
    }
}

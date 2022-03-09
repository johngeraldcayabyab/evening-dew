<?php

namespace App\Observers;

use App\Events\ContactUpsertEvent;
use App\Models\Contact;
use App\Models\User;

class UserObserver
{
    public function creating(User $user)
    {
        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
        ];
        $contact = Contact::create($data);
        $user->contact_id = $contact->id;
        ContactUpsertEvent::dispatch($contact, $data);
    }
}

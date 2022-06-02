<?php

namespace App\Observers;

use App\Models\Contact;
use App\Models\User;

class ContactObserver
{
    public function updating(Contact $contact)
    {
        $contact->avatar = avatar_filter($contact->avatar);
        $data = [
            'name' => $contact->name,
            'email' => $contact->email,
            'avatar' => $contact->avatar,
        ];
        User::where('email', $contact->email)->update($data);
    }
}

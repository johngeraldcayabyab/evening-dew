<?php

namespace App\Observers;

use App\Models\Contact;

class ContactObserver
{
    public function updating(Contact $contact)
    {
        $contact->avatar = avatar_filter($contact->avatar);
    }
}

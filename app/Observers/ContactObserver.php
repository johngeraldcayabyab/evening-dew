<?php

namespace App\Observers;

use App\Models\Contact;

class ContactObserver
{
    public function updating(Contact $contact)
    {
        if (filter_var($contact->avatar, FILTER_VALIDATE_URL)) {
            $parsedUrl = parse_url($contact->avatar);
            $path = explode('/', $parsedUrl['path']);
            $contact->avatar = end($path);
        }
    }
}

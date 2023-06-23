<?php

namespace App\Listeners;

use App\Events\ContactUpdated;

class ContactUpdateCompany
{
    public function handle(ContactUpdated $event)
    {
        $contact = $event->contact;
        $company = $contact->company;
        if ($company) {
            $company->update([
                'name' => $contact->name,
                'email' => $contact->email,
                'avatar' => $contact->avatar,
            ]);
        }
    }
}

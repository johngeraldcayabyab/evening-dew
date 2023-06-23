<?php

namespace App\Listeners;

use App\Events\CompanyCreated;
use App\Events\ContactCreated;
use App\Models\Contact;

class CompanyCreateContact
{
    public function handle(CompanyCreated $event)
    {
        $company = $event->company;
        $contact = Contact::create([
            'name' => $company->name,
            'email' => $company->email,
            'avatar' => $company->avatar,
        ]);
        $company->contact_id = $contact->id;
        $company->save();
        ContactCreated::dispatch($contact);
    }
}

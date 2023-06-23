<?php

namespace App\Listeners;

use App\Events\CompanyUpdated;
use App\Events\ContactUpdated;

class CompanyUpdateContact
{
    public function handle(CompanyUpdated $event)
    {
        $company = $event->company;
        $contact = $company->contact;
        if ($contact) {
            $contact->update([
                'name' => $company->name,
                'email' => $company->email,
                'avatar' => $company->avatar,
            ]);
            ContactUpdated::dispatch($contact);
        }
    }
}

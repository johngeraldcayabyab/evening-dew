<?php

namespace App\Listeners;

use App\Events\ContactCreatedEvent;
use App\Models\Address;
use Illuminate\Support\Arr;

class ContactCreateAddressListener
{
    public function handle(ContactCreatedEvent $event)
    {
        $contact = $event->contact;
        $data = $event->data;
        $addressData = Arr::only($data, (new Address())->getFields());
        $addressData['address_name'] = $contact->name . " " . Address::DEFAULT . " address";
        $addressData['type'] = Address::DEFAULT;
        $addressData['contact_id'] = $contact->id;
        Address::create($addressData);
    }
}

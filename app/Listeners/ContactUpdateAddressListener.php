<?php

namespace App\Listeners;

use App\Events\ContactUpdated;
use App\Models\Address;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Arr;

class ContactUpdateAddressListener implements ShouldQueue
{
    public function handle(ContactUpdated $event)
    {
        $contact = $event->contact;
        $data = $event->data;
        $addressData = Arr::only($data, (new Address())->getFields());
        $addressData['address_name'] = $contact->name . " " . Address::DEFAULT . " address";
        $addressData['type'] = Address::DEFAULT;
        $defaultAddress = $contact->defaultAddress();
        Address::find($defaultAddress->id)->update($addressData);
    }
}

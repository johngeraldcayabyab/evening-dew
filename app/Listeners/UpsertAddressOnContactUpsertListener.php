<?php

namespace App\Listeners;

use App\Events\ContactUpsertEvent;
use App\Models\Address;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Arr;

class UpsertAddressOnContactUpsertListener
{
    public function handle(ContactUpsertEvent $event)
    {
        $contact = $event->contact;
        $data = $event->data;
        $addressData = Arr::only($data, (new Address())->getFields());
        $addressData['address_name'] = $contact->name . " " . Address::DEFAULT . " address";
        $addressData['type'] = Address::DEFAULT;
        $defaultAddress = $contact->defaultAddress();
        if ($defaultAddress) {
            Address::find($defaultAddress->id)->update($addressData);
        } else {
            $addressData['contact_id'] = $contact->id;
            Address::create($addressData);
        }
    }
}

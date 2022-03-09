<?php

namespace App\Observers;

use App\Models\Address;
use App\Models\GlobalSetting;

class AddressObserver
{
    public function creating(Address $address)
    {
        if (!$address->country_id) {
            $address->country_id = GlobalSetting::latestFirst()->generalDefaultCountry->id;
        }
    }

    public function updating(Address $address)
    {
        if (!$address->country_id) {
            $address->country_id = GlobalSetting::latestFirst()->generalDefaultCountry->id;
        }
    }
}

<?php

namespace App\Observers;

use App\Models\Address;
use App\Models\GlobalSetting;

class AddressObserver
{
    public function creating(Address $address)
    {
        $this->setDefaults($address);
    }

    public function updating(Address $address)
    {
        $this->setDefaults($address);
    }

    public function setDefaults($model)
    {
        $generalDefaultCountry = GlobalSetting::latestFirst()->generalDefaultCountry;
        $modelArray = $model->toArray();
        if (!isset($modelArray['country_id'])) {
            $model->country_id = $generalDefaultCountry->id;
        }
        if (!isset($modelArray['type'])) {
            $model->type = Address::DEFAULT;
        }
    }
}

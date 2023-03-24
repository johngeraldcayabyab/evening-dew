<?php

namespace App\Observers;

use App\Models\Address;
use App\Models\Country;

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
        $modelArray = $model->toArray();
        if (!isset($modelArray['country_id'])) {
            $model->country_id = Country::default()->id;
        }
        if (!isset($modelArray['type'])) {
            $model->type = Address::DEFAULT;
        }
    }
}

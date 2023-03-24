<?php

namespace App\Observers;

use App\Models\Country;
use Illuminate\Validation\ValidationException;

class CountryObserver
{
    public function creating(Country $country)
    {
        $this->defaults($country);
    }

    public function updating(Country $country)
    {
        if (!$country->is_default) {
            $currentDefault = Country::where('id', $country->id)->first();
            if ($currentDefault->is_default) {
                throw ValidationException::withMessages(['is_default' => 'There should be one default']);
            }
        }
        $this->defaults($country);
    }

    public function defaults($country)
    {
        if ($country->is_default) {
            $previousDefault = Country::where('is_default', true)
                ->where('id', '!=', $country->id)
                ->first();
            if ($previousDefault) {
                $previousDefault->is_default = false;
                $previousDefault->saveQuietly();
            }
        }
    }
}

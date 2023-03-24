<?php

namespace App\Observers;

use App\Models\Currency;
use Illuminate\Validation\ValidationException;

class CurrencyObserver
{
    public function creating(Currency $currency)
    {
        $this->defaults($currency);
    }

    public function updating(Currency $currency)
    {
        if (!$currency->is_default) {
            $currentDefault = Currency::where('id', $currency->id)->first();
            if ($currentDefault->is_default) {
                throw ValidationException::withMessages(['is_default' => 'There should be one default']);
            }
        }
        $this->defaults($currency);
    }

    public function defaults($currency)
    {
        if ($currency->is_default) {
            $previousDefault = Currency::where('is_default', true)
                ->where('id', '!=', $currency->id)
                ->first();
            if ($previousDefault) {
                $previousDefault->is_default = false;
                $previousDefault->saveQuietly();
            }
        }
    }
}

<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'countries';
    protected $guarded = [];

    public function currency()
    {
        return $this->hasOne(Currency::class);
    }

    public function scopeWhereCountryName($query, $countryName)
    {
        return $query->where('country_name', 'like', "%$countryName%");
    }

    public function scopeWhereCurrency($query, $currency)
    {
        return $query->whereHas('currency', function ($query) use ($currency) {
            return $query->where('currency', 'like', "%$currency%");
        });
    }

    public function scopeWhereCountryCode($query, $countryCode)
    {
        return $query->where('country_code', 'like', "%$countryCode%");
    }

    public function scopeWhereCountryCallingCode($query, $countryCallingCode)
    {
        return $query->where('country_calling_code', 'like', "%$countryCallingCode%");
    }

    public function scopeWhereVatLabel($query, $vatLabel)
    {
        return $query->where('vat_label', 'like', "%$vatLabel%");
    }

    public function scopeOrderByCountryName($query, $order)
    {
        return $query->orderBy('country_name', $order);
    }

    public function scopeOrderByCurrency($query, $order)
    {
        return $query->orderBy(Currency::select('currency')->whereColumn('currencies.id', 'countries.currency_id'), $order);
    }

    public function scopeOrderByCountryCode($query, $order)
    {
        return $query->orderBy('country_code', $order);
    }

    public function scopeOrderByCountryCallingCode($query, $order)
    {
        return $query->orderBy('country_calling_code', $order);
    }

    public function scopeOrderByVatLabel($query, $order)
    {
        return $query->orderBy('vat_label', $order);
    }
}

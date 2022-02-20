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

    public function getSearchableAndSortableFields()
    {
        return [
            'country_name',
            'currency',
            'country_code',
            'country_calling_code',
            'vat_label',
            'currency_id',
        ];
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function scopeWhereCurrency($query, $where)
    {
        return $this->likeHas($query, 'currency', 'currency', $where);
    }

    public function scopeWhereCountryName($query, $where)
    {
        return $this->like($query, 'country_name', $where);
    }

    public function scopeWhereCountryCode($query, $where)
    {
        return $this->like($query, 'country_code', $where);
    }

    public function scopeWhereCountryCallingCode($query, $where)
    {
        return $this->like($query, 'country_calling_code', $where);
    }

    public function scopeWhereVatLabel($query, $where)
    {
        return $this->like($query, 'vat_label', $where);
    }

    public function scopeWhereCurrencyId($query, $where)
    {
        return $query->where('currency_id', $where);
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

    public function scopeOrderByCurrencyId($query, $order)
    {
        return $query->orderBy('currency_id', $order);
    }
}

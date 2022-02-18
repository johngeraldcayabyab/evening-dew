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

    public function scopeWhereCountryName($query, $where)
    {
        return $query->where('country_name', 'like', "%$where%");
    }

    public function scopeWhereCurrency($query, $where)
    {
        return $query->whereHas('currency', function ($query) use ($where) {
            return $query->where('currency', 'like', "%$where%");
        });
    }

    public function scopeWhereCountryCode($query, $where)
    {
        return $query->where('country_code', 'like', "%$where%");
    }

    public function scopeWhereCountryCallingCode($query, $where)
    {
        return $query->where('country_calling_code', 'like', "%$where%");
    }

    public function scopeWhereVatLabel($query, $where)
    {
        return $query->where('vat_label', 'like', "%$where%");
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

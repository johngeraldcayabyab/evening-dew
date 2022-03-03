<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Currency extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    const BEFORE_AMOUNT = 'before_amount';
    const AFTER_AMOUNT = 'after_amount';

    protected $table = 'currencies';
    protected $guarded = [];

    public static function getSymbolPositions()
    {
        return [self::BEFORE_AMOUNT, self::AFTER_AMOUNT];
    }

    public function country()
    {
        return $this->hasMany(Country::class);
    }

    public function scopeWhereCurrency($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereUnit($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSubUnit($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereRoundingFactor($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereDecimalPlaces($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSymbol($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSymbolPosition($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeOrderByCurrency($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByUnit($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySubUnit($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByRoundingFactor($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByDecimalPlaces($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySymbol($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySymbolPosition($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'currency';
    }
}

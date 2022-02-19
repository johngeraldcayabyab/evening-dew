<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Currency extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    const BEFORE_AMOUNT = 'before_amount';
    const AFTER_AMOUNT = 'after_amount';

    protected $table = 'currencies';
    protected $guarded = [];

    public function getSearchableAndSortableFields()
    {
        return [
            'currency',
            'name',
            'unit',
            'sub_unit',
            'rounding_factor',
            'decimal_places',
            'symbol',
            'symbol_position',
        ];
    }

    public function country()
    {
        return $this->hasMany(Country::class);
    }

    public static function getSymbolPositions()
    {
        return [self::BEFORE_AMOUNT, self::AFTER_AMOUNT];
    }

    public function scopeWhereCurrency($query, $where)
    {
        return $this->like($query, 'currency', $where);
    }

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, 'name', $where);
    }

    public function scopeWhereUnit($query, $where)
    {
        return $this->like($query, 'unit', $where);
    }

    public function scopeWhereSubUnit($query, $where)
    {
        return $this->like($query, 'sub_unit', $where);
    }

    public function scopeWhereRoundingFactor($query, $where)
    {
        return $this->like($query, 'rounding_factor', $where);
    }

    public function scopeWhereDecimalPlaces($query, $where)
    {
        return $this->like($query, 'decimal_places', $where);
    }

    public function scopeWhereSymbol($query, $where)
    {
        return $this->like($query, 'symbol', $where);
    }

    public function scopeWhereSymbolPosition($query, $where)
    {
        return $this->like($query, 'symbol_position', $where);
    }

    public function scopeOrderByCurrency($query, $order)
    {
        return $query->orderBy('currency', $order);
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }

    public function scopeOrderByUnit($query, $order)
    {
        return $query->orderBy('unit', $order);
    }

    public function scopeOrderBySubUnit($query, $order)
    {
        return $query->orderBy('sub_unit', $order);
    }

    public function scopeOrderByRoundingFactor($query, $order)
    {
        return $query->orderBy('rounding_factor', $order);
    }

    public function scopeOrderByDecimalPlaces($query, $order)
    {
        return $query->orderBy('decimal_places', $order);
    }

    public function scopeOrderBySymbol($query, $order)
    {
        return $query->orderBy('symbol', $order);
    }

    public function scopeOrderBySymbolPosition($query, $order)
    {
        return $query->orderBy('symbol_position', $order);
    }
}

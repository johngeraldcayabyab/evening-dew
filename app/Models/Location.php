<?php

namespace App\Models;

use App\Traits\HierarchyTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;
    use HierarchyTrait;

    const VENDOR = 'vendor';
    const VIEW = 'view';
    const INTERNAL = 'internal';
    const CUSTOMER = 'customer';
    const INVENTORY_LOSS = 'inventory_loss';
    const PRODUCTION = 'production';
    const TRANSIT_LOCATION = 'transit_location';

    protected $table = 'locations';
    protected $guarded = [];

    public static function getTypes()
    {
        return [self::VENDOR, self::VIEW, self::INTERNAL, self::CUSTOMER, self::INVENTORY_LOSS, self::PRODUCTION, self::TRANSIT_LOCATION];
    }

    public function getSearchableAndSortableFields()
    {
        return [
            'name',
            'parent_location_id',
            'is_a_scrap_location',
            'is_a_return_location',
            'type'
        ];
    }

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereParentLocationId($query, $where)
    {
        return $query->where('parent_location_id', $where);
    }

    public function scopeWhereIsAScrapLocation($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereIsAReturnLocation($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereType($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByParentLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByIsAScrapLocation($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByIsAReturnLocation($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByType($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }
}

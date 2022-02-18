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

    public function getLocationTypes()
    {
        return [self::VENDOR, self::VIEW, self::INTERNAL, self::CUSTOMER, self::INVENTORY_LOSS, self::PRODUCTION, self::TRANSIT_LOCATION];
    }

    public function getSearchableAndSortableFields()
    {
        return [
            'with_parents',
            'type',
        ];
    }

    public function scopeWhereName($query, $name)
    {
        return $query->where('name', 'like', "%$name%");
    }

    public function scopeWhereIsAScrapLocation($query, $isAScrapLocation)
    {
        return $query->where('is_a_scrap_location', 'like', "%$isAScrapLocation%");
    }

    public function scopeWhereIsAReturnLocation($query, $isAReturnLocation)
    {
        return $query->where('is_a_return_location', 'like', "%$isAReturnLocation%");
    }

    public function scopeWhereType($query, $type)
    {
        return $query->where('type', 'like', "%$type%");
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }

    public function scopeOrderByIsAScrapLocation($query, $order)
    {
        return $query->orderBy('is_a_scrap_location', $order);
    }

    public function scopeOrderByIsAReturnLocation($query, $order)
    {
        return $query->orderBy('is_a_return_location', $order);
    }

    public function scopeOrderByType($query, $order)
    {
        return $query->orderBy('type', $order);
    }

    public function scopeOrderByWithParents($query, $order)
    {
        return $query->orderBy('name', $order);
    }

    public function scopeWhereWithParents($query, $location)
    {
        return $query->where('name', 'like', "%$location%");
    }
}

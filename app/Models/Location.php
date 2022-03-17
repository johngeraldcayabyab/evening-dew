<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\HierarchyTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Location extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;
    use HierarchyTrait;
    use LogsActivity;

    const VENDOR = 'vendor';
    const VIEW = 'view';
    const INTERNAL = 'internal';
    const CUSTOMER = 'customer';
    const INVENTORY_LOSS = 'inventory_loss';
    const PRODUCTION = 'production';
    const TRANSIT_LOCATION = 'transit_location';

    protected $table = 'locations';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getTypes()
    {
        return [self::VENDOR, self::VIEW, self::INTERNAL, self::CUSTOMER, self::INVENTORY_LOSS, self::PRODUCTION, self::TRANSIT_LOCATION];
    }

    public function parentLocation()
    {
        return $this->belongsTo(Location::class, 'parent_location_id', 'id');
    }

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereParentLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
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

    public function scopeWhereParentLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeOrderByParentLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'parent.name';
    }
}

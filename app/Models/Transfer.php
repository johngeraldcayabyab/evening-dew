<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transfer extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'transfers';
    protected $guarded = [];

    const AS_SOON_AS_POSSIBLE = 'as_soon_as_possible';
    const WHEN_ALL_PRODUCTS_ARE_READY = 'when_all_products_are_ready';

    public static function getShippingPolicies()
    {
        return [self::AS_SOON_AS_POSSIBLE, self::WHEN_ALL_PRODUCTS_ARE_READY];
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id', 'id');
    }

    public function operationType()
    {
        return $this->belongsTo(OperationType::class, 'operation_type_id', 'id');
    }

    public function sourceLocation()
    {
        return $this->belongsTo(Location::class, 'source_location_id', 'id');
    }

    public function destinationLocation()
    {
        return $this->belongsTo(Location::class, 'destination_location_id', 'id');
    }

    public function responsible()
    {
        return $this->belongsTo(User::class, 'responsible_id', 'id');
    }

    public function scopeWhereReference($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereContactId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereOperationTypeId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereSourceLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereDestinationLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereScheduledDate($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSourceDocument($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereTrackingReference($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereWeight($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereForShipping($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereShippingPolicy($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereResponsibleId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereNote($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeOrderByReference($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByContactId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByOperationTypeId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySourceLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByDestinationLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByScheduledDate($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySourceDocument($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByTrackingReference($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByWeight($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByWeightForShipping($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByShippingPolicy($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByResponsibleId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByNote($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereContact($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereOperationType($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereSourceLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereDestinationLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereResponsible($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeOrderByContact($query, $order)
    {
        return $this->orderHas($query, new Contact(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByOperationType($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderBySourceLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByDestinationLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByResponsible($query, $order)
    {
        return $this->orderHas($query, new User(), 'name', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'reference';
    }
}

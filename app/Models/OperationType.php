<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OperationType extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    const AT_CONFIRMATION = 'at_confirmation';
    const MANUALLY = 'manually';
    const BEFORE_SCHEDULED_DATE = 'before_scheduled_date';

    const RECEIPT = 'receipt';
    const DELIVERY = 'delivery';
    const INTERNAL = 'internal';
    const MANUFACTURING = 'manufacturing';

    protected $table = 'operations_types';
    protected $guarded = [];

    public static function getReservationMethods()
    {
        return [self::AT_CONFIRMATION, self::MANUALLY, self::BEFORE_SCHEDULED_DATE];
    }

    public static function getTypes()
    {
        return [self::RECEIPT, self::DELIVERY, self::INTERNAL, self::MANUFACTURING];
    }

    public function referenceSequence()
    {
        return $this->belongsTo(Sequence::class, 'reference_sequence_id', 'id');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id', 'id');
    }

    public function operationTypeForReturns()
    {
        return $this->belongsTo(OperationType::class, 'operation_type_for_returns_id', 'id');
    }

    public function defaultSourceLocation()
    {
        return $this->belongsTo(Location::class, 'default_source_location_id', 'id');
    }

    public function defaultDestinationLocation()
    {
        return $this->belongsTo(Location::class, 'default_destination_location_id', 'id');
    }

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereReferenceSequenceId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereCode($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereWarehouseId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereReservationMethod($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereType($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereOperationTypeForReturnsId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereShowDetailedOperation($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWherePreFillDetailedOperation($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereReservationDaysBefore($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereReservationDaysBeforePriority($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereCreateNewLotsSerialNumbers($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereUseExistingLotsSerialNumbers($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereDefaultSourceLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereDefaultDestinationLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByReferenceSequenceId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByCode($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByWarehouseId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByReservationMethod($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByType($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByOperationTypeForReturnsId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByShowDetailedOperation($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPreFillDetailedOperation($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByReservationDaysBefore($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByReservationDaysBeforePriority($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderCreateNewLotsSerialNumbers($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByUseExistingLotsSerialNumbers($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByDefaultSourceLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByDefaultDestinationLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereReferenceSequence($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereWarehouse($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereOperationTypeForReturns($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereDefaultSourceLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereDefaultDestinationLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeOrderByReferenceSequence($query, $order)
    {
        return $this->orderHas($query, new Sequence(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByWarehouse($query, $order)
    {
        return $this->orderHas($query, new Warehouse(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByOperationTypeForReturns($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByDefaultSourceLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByDefaultDestinationLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'name';
    }
}

<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OperationType extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    /**
     * Reservation method
     */
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

    public function getSearchableAndSortableFields()
    {
        return [
            'name',
            'reference_sequence_id',
            'reference_sequence',
            'code',
            'warehouse_id',
            'warehouse',
            'reservation_method',
            'type',
            'operation_type_for_returns_id',
            'operation_type_for_returns',
            'show_detailed_operation',
            'pre_fill_detailed_operation',
            'reservation_days_before',
            'reservation_days_before_priority',
            'create_new_lots_serial_numbers',
            'use_existing_lots_serial_numbers',
            'default_source_location_id',
            'default_source_location',
            'default_destination_location_id',
            'default_destination_location',
        ];
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
        return $query->where('name', 'like', "%$where%");
    }

    public function scopeWhereReferenceSequenceId($query, $where)
    {
        return $query->where('reference_sequence_id', $where);
    }

    public function scopeWhereCode($query, $where)
    {
        return $query->where('code', 'like', "%$where%");
    }

    public function scopeWhereWarehouseId($query, $where)
    {
        return $query->where('warehouse_id', $where);
    }

    public function scopeWhereReservationMethod($query, $where)
    {
        return $query->where('reservation_method', 'like', "%$where%");
    }

    public function scopeWhereType($query, $where)
    {
        return $query->where('type', 'like', "%$where%");
    }

    public function scopeWhereOperationTypeForReturnsId($query, $where)
    {
        return $query->where('operation_type_for_returns_id', $where);
    }

    public function scopeWhereShowDetailedOperation($query, $where)
    {
        return $query->where('show_detailed_operation', $where);
    }

    public function scopeWherePreFillDetailedOperation($query, $where)
    {
        return $query->where('pre_fill_detailed_operation', $where);
    }

    public function scopeWhereReservationDaysBefore($query, $where)
    {
        return $query->where('reservation_days_before', 'like', "%$where%");
    }

    public function scopeWhereReservationDaysBeforePriority($query, $where)
    {
        return $query->where('reservation_days_before_priority', 'like', "%$where%");
    }

    public function scopeWhereCreateNewLotsSerialNumbers($query, $where)
    {
        return $query->where('create_new_lots_serial_numbers', $where);
    }

    public function scopeWhereUseExistingLotsSerialNumbers($query, $where)
    {
        return $query->where('use_existing_lots_serial_numbers', $where);
    }

    public function scopeWhereDefaultSourceLocationId($query, $where)
    {
        return $query->where('default_source_location_id', $where);
    }

    public function scopeWhereDefaultDestinationLocationId($query, $where)
    {
        return $query->where('default_destination_location_id', $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }

    public function scopeOrderByReferenceSequenceId($query, $order)
    {
        return $query->orderBy('reference_sequence_id', $order);
    }

    public function scopeOrderByCode($query, $order)
    {
        return $query->orderBy('code', $order);
    }

    public function scopeOrderByWarehouseId($query, $order)
    {
        return $query->orderBy('warehouse_id', $order);
    }

    public function scopeOrderByReservationMethod($query, $order)
    {
        return $query->orderBy('reservation_method', $order);
    }

    public function scopeOrderByType($query, $order)
    {
        return $query->orderBy('type', $order);
    }

    public function scopeOrderByOperationTypeForReturnsId($query, $order)
    {
        return $query->orderBy('operation_type_for_returns_id', $order);
    }

    public function scopeOrderByShowDetailedOperation($query, $order)
    {
        return $query->orderBy('show_detailed_operation', $order);
    }

    public function scopeOrderByPreFillDetailedOperation($query, $order)
    {
        return $query->orderBy('pre_fill_detailed_operation', $order);
    }

    public function scopeOrderByReservationDaysBefore($query, $order)
    {
        return $query->orderBy('reservation_days_before', $order);
    }

    public function scopeOrderByReservationDaysBeforePriority($query, $order)
    {
        return $query->orderBy('reservation_days_before_priority', $order);
    }

    public function scopeOrderCreateNewLotsSerialNumbers($query, $order)
    {
        return $query->orderBy('create_new_lots_serial_numbers', $order);
    }

    public function scopeOrderByUseExistingLotsSerialNumbers($query, $order)
    {
        return $query->orderBy('use_existing_lots_serial_numbers', $order);
    }

    public function scopeOrderByDefaultSourceLocationId($query, $order)
    {
        return $query->orderBy('default_source_location_id', $order);
    }

    public function scopeOrderByDefaultDestinationLocationId($query, $order)
    {
        return $query->orderBy('default_destination_location_id', $order);
    }

    public function scopeWhereReferenceSequence($query, $where)
    {
        return $query->whereHas('referenceSequence', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWhereWarehouse($query, $where)
    {
        return $query->whereHas('warehouse', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWhereOperationTypeForReturns($query, $where)
    {
        return $query->whereHas('operationTypeForReturns', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWhereDefaultSourceLocation($query, $where)
    {
        return $query->whereHas('defaultSourceLocation', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWhereDefaultDestinationLocation($query, $where)
    {
        return $query->whereHas('defaultDestinationLocation', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeOrderReferenceSequence($query, $order)
    {
        return $query->orderBy(Sequence::select('name')->whereColumn('sequences.id', 'operations_types.reference_sequence_id'), $order);
    }

    public function scopeOrderByWarehouse($query, $order)
    {
        return $query->orderBy(Warehouse::select('name')->whereColumn('warehouses.id', 'operations_types.warehouse_id'), $order);
    }

    public function scopeOrderByOperationTypeForReturns($query, $order)
    {
        return $query->orderBy(OperationType::select('name')->whereColumn('operations_types.id', 'operations_types.operation_type_for_returns_id'), $order);
    }

    public function scopeOrderByDefaultSourceLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'operations_types.default_source_location_id'), $order);
    }

    public function scopeOrderByDefaultDestinationLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'operations_types.default_destination_location_id'), $order);
    }
}

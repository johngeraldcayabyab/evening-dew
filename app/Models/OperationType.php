<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class OperationType extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;

    const AT_CONFIRMATION = 'at_confirmation';
    const MANUALLY = 'manually';
    const BEFORE_SCHEDULED_DATE = 'before_scheduled_date';

    const RECEIPT = 'receipt';
    const DELIVERY = 'delivery';
    const INTERNAL = 'internal';
    const MANUFACTURING = 'manufacturing';
    const ADJUSTMENT = 'adjustment';

    protected $table = 'operations_types';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getReservationMethods()
    {
        return [self::AT_CONFIRMATION, self::MANUALLY, self::BEFORE_SCHEDULED_DATE];
    }

    public static function getTypes()
    {
        return [self::RECEIPT, self::DELIVERY, self::INTERNAL, self::MANUFACTURING, self::ADJUSTMENT];
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

    public function scopeDefaultDelivery($query)
    {
        $inventoryDefaultWarehouse = GlobalSetting::latestFirst()->inventoryDefaultWarehouse;
        if (!$inventoryDefaultWarehouse) {
            return false;
        }
        return $query->where('warehouse_id', $inventoryDefaultWarehouse->id)->where('type', self::DELIVERY)->first();
    }

    public function slug()
    {
        return 'name';
    }
}

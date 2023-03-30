<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Warehouse extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const DEFAULT_MANUFACTURE_TO_RESUPPLY = true;
    const DEFAULT_BUY_TO_RESUPPLY = true;

    protected $table = 'warehouses';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function viewLocation()
    {
        return $this->belongsTo(Location::class, 'view_location_id', 'id');
    }

    public function stockLocation()
    {
        return $this->belongsTo(Location::class, 'stock_location_id', 'id');
    }

    public function inputLocation()
    {
        return $this->belongsTo(Location::class, 'input_location_id', 'id');
    }

    public function qualityControlLocation()
    {
        return $this->belongsTo(Location::class, 'quality_control_location_id', 'id');
    }

    public function packingLocation()
    {
        return $this->belongsTo(Location::class, 'packing_location_id', 'id');
    }

    public function outputLocation()
    {
        return $this->belongsTo(Location::class, 'output_location_id', 'id');
    }

    public function stockAfterManufacturingLocation()
    {
        return $this->belongsTo(Location::class, 'stock_after_manufacturing_location_id', 'id');
    }

    public function pickingBeforeManufacturingLocation()
    {
        return $this->belongsTo(Location::class, 'picking_before_manufacturing_location_id', 'id');
    }

    public function adjustmentLocation()
    {
        return $this->belongsTo(Location::class, 'adjustment_location_id', 'id');
    }

    public function inType()
    {
        return $this->belongsTo(OperationType::class, 'in_type_id', 'id');
    }

    public function internalType()
    {
        return $this->belongsTo(OperationType::class, 'internal_type_id', 'id');
    }

    public function pickType()
    {
        return $this->belongsTo(OperationType::class, 'pick_type_id', 'id');
    }

    public function packType()
    {
        return $this->belongsTo(OperationType::class, 'pack_type_id', 'id');
    }

    public function outType()
    {
        return $this->belongsTo(OperationType::class, 'out_type_id', 'id');
    }

    public function stockAfterManufacturingOperationType()
    {
        return $this->belongsTo(OperationType::class, 'stock_after_manufacturing_operation_type_id', 'id');
    }

    public function pickingBeforeManufacturingOperationType()
    {
        return $this->belongsTo(OperationType::class, 'picking_before_manufacturing_operation_type_id', 'id');
    }

    public function manufacturingOperationType()
    {
        return $this->belongsTo(OperationType::class, 'manufacturing_operation_type_id', 'id');
    }

    public function adjustmentOperationType()
    {
        return $this->belongsTo(OperationType::class, 'adjustment_operation_type_id', 'id');
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', true)->first();
    }

    public function slug()
    {
        return 'name';
    }
}

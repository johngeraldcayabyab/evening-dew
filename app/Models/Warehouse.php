<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Warehouse extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'warehouses';
    protected $guarded = [];

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

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereShortName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereManufactureToResupply($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereBuyToResupply($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereViewLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereStockLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereInputLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereQualityControlLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWherePackingLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereOutputLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereStockAfterManufacturingLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWherePickingBeforeManufacturingLocationId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereInTypeId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereInternalTypeId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWherePickTypeId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWherePackTypeId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereOutTypeId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereStockAfterManufacturingOperationTypeId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWherePickingBeforeManufacturingOperationTypeId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereManufacturingOperationTypeId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByShortName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByManufactureToResupply($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByBuyToResupply($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByViewLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByStockLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByInputLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByQualityControlLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPackingLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByOutputLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByStockAfterManufacturingLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPickingBeforeManufacturingLocationId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByInTypeId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByInternalTypeId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPickTypeId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPackTypeId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByOutTypeId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByStockAfterManufacturingOperationTypeId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPickingBeforeManufacturingOperationTypeId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByManufacturingOperationTypeId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereViewLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereStockLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereInputLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereQualityControlLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWherePackingLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereOutputLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereStockAfterManufacturingLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWherePickingBeforeManufacturingLocation($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereInType($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereInternalType($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWherePickType($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWherePackType($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereOutType($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereStockAfterManufacturingOperationType($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWherePickingBeforeManufacturing($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereManufacturingOperationType($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeOrderByViewLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', "view_location_id", $order);
    }

    public function scopeOrderByStockLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', "stock_location_id", $order);
    }

    public function scopeOrderByInputLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', "input_location_id", $order);
    }

    public function scopeOrderByQualityControlLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', "quality_control_location_id", $order);
    }

    public function scopeOrderByPackingLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', "packing_location_id", $order);
    }

    public function scopeOrderByOutputLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', "output_location_id", $order);
    }

    public function scopeOrderByStockAfterManufacturingLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', "stock_after_manufacturing_location_id", $order);
    }

    public function scopeOrderByPickingBeforeManufacturingLocation($query, $order)
    {
        return $this->orderHas($query, new Location(), 'name', "picking_before_manufacturing_location_id", $order);
    }

    public function scopeOrderByInType($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', "in_type_id", $order);
    }

    public function scopeOrderByInternalType($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', "internal_type_id", $order);
    }

    public function scopeOrderByPickType($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', "pick_type_id", $order);
    }

    public function scopeOrderByPackType($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', "pack_type_id", $order);
    }

    public function scopeOrderByOutType($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', "out_type_id", $order);
    }

    public function scopeOrderByStockAfterManufacturing($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', "stock_after_manufacturing_operation_type_id", $order);
    }

    public function scopeOrderByPickingBeforeManufacturing($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', "picking_before_manufacturing_operation_type_id", $order);
    }

    public function scopeOrderByManufacturingOperationType($query, $order)
    {
        return $this->orderHas($query, new OperationType(), 'name', "manufacturing_operation_type_id", $order);
    }
}

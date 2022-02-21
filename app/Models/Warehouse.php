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

    public function getSearchableAndSortableFields()
    {
        return [
            'name',
            'manufacture_to_resupply',
            'buy_to_resupply',
            'view_location_id',
            'view_location',
            'stock_location_id',
            'stock_location',
            'input_location_id',
            'input_location',
            'quality_control_location_id',
            'quality_control_location',
            'packing_location_id',
            'packing_location',
            'output_location_id',
            'output_location',
            'stock_after_manufacturing_location_id',
            'stock_after_manufacturing_location',
            'picking_before_manufacturing_location_id',
            'picking_before_manufacturing_location',
            'in_type_id',
            'in_type',
            'internal_type_id',
            'internal_type',
            'pick_type_id',
            'pick_type',
            'pack_type_id',
            'pack_type',
            'out_type_id',
            'out_type',
            'stock_after_manufacturing_operation_type_id',
            'stock_after_manufacturing_operation_type',
            'picking_before_manufacturing_operation_type_id',
            'picking_before_manufacturing_operation_type',
            'manufacturing_operation_type_id',
            'manufacturing_operation_type'
        ];
    }

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
        return $query->where('view_location_id', $where);
    }

    public function scopeWhereStockLocationId($query, $where)
    {
        return $query->where('stock_location_id', $where);
    }

    public function scopeWhereInputLocationId($query, $where)
    {
        return $query->where('input_location_id', $where);
    }

    public function scopeWhereQualityControlLocationId($query, $where)
    {
        return $query->where('quality_control_location_id', $where);
    }

    public function scopeWherePackingLocationId($query, $where)
    {
        return $query->where('packing_location_id', $where);
    }

    public function scopeWhereOutputLocationId($query, $where)
    {
        return $query->where('output_location_id', $where);
    }

    public function scopeWhereStockAfterManufacturingLocationId($query, $where)
    {
        return $query->where('stock_after_manufacturing_location_id', $where);
    }

    public function scopeWherePickingBeforeManufacturingLocationId($query, $where)
    {
        return $query->where('picking_before_manufacturing_location_id', $where);
    }

    public function scopeWhereInTypeId($query, $where)
    {
        return $query->where('in_type_id', $where);
    }

    public function scopeWhereInternalTypeId($query, $where)
    {
        return $query->where('internal_type_id', $where);
    }

    public function scopeWherePickTypeId($query, $where)
    {
        return $query->where('pick_type_id', $where);
    }

    public function scopeWherePackTypeId($query, $where)
    {
        return $query->where('pack_type_id', $where);
    }

    public function scopeWhereOutTypeId($query, $where)
    {
        return $query->where('out_type_id', $where);
    }

    public function scopeWhereStockAfterManufacturingOperationTypeId($query, $where)
    {
        return $query->where('stock_after_manufacturing_operation_type_id', $where);
    }

    public function scopeWherePickingBeforeManufacturingOperationTypeId($query, $where)
    {
        return $query->where('picking_before_manufacturing_operation_type_id', $where);
    }

    public function scopeWhereManufacturingOperationTypeId($query, $where)
    {
        return $query->where('manufacturing_operation_type_id', $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }

    public function scopeOrderByShortName($query, $order)
    {
        return $query->orderBy('short_name', $order);
    }

    public function scopeOrderByManufactureToResupply($query, $order)
    {
        return $query->orderBy('manufacture_to_resupply', $order);
    }

    public function scopeOrderByBuyToResupply($query, $order)
    {
        return $query->orderBy('buy_to_resupply', $order);
    }

    public function scopeOrderByViewLocationId($query, $order)
    {
        return $query->orderBy('view_location_id', $order);
    }

    public function scopeOrderByStockLocationId($query, $order)
    {
        return $query->orderBy('stock_location_id', $order);
    }

    public function scopeOrderByInputLocationId($query, $order)
    {
        return $query->orderBy('input_location_id', $order);
    }

    public function scopeOrderByQualityControlLocationId($query, $order)
    {
        return $query->orderBy('quality_control_location_id', $order);
    }

    public function scopeOrderByPackingLocationId($query, $order)
    {
        return $query->orderBy('packing_location_id', $order);
    }

    public function scopeOrderByOutputLocationId($query, $order)
    {
        return $query->orderBy('output_location_id', $order);
    }

    public function scopeOrderByStockAfterManufacturingLocationId($query, $order)
    {
        return $query->orderBy('stock_after_manufacturing_location_id', $order);
    }

    public function scopeOrderByPickingBeforeManufacturingLocationId($query, $order)
    {
        return $query->orderBy('picking_before_manufacturing_location_id', $order);
    }

    public function scopeOrderByInTypeId($query, $order)
    {
        return $query->orderBy('in_type_id', $order);
    }

    public function scopeOrderByInternalTypeId($query, $order)
    {
        return $query->orderBy('internal_type_id', $order);
    }

    public function scopeOrderByPickTypeId($query, $order)
    {
        return $query->orderBy('pick_type_id', $order);
    }

    public function scopeOrderByPackTypeId($query, $order)
    {
        return $query->orderBy('pack_type_id', $order);
    }

    public function scopeOrderByOutTypeId($query, $order)
    {
        return $query->orderBy('out_type_id', $order);
    }

    public function scopeOrderByStockAfterManufacturingOperationTypeId($query, $order)
    {
        return $query->orderBy('stock_after_manufacturing_operation_type_id', $order);
    }

    public function scopeOrderByPickingBeforeManufacturingOperationTypeId($query, $order)
    {
        return $query->orderBy('picking_before_manufacturing_operation_type_id', $order);
    }

    public function scopeOrderByManufacturingOperationTypeId($query, $order)
    {
        return $query->orderBy('manufacturing_operation_type_id', $order);
    }

    public function scopeWhereViewLocation($query, $where)
    {
        return $this->likeHas($query, 'viewLocation', 'name', $where);
    }

    public function scopeWhereStockLocation($query, $where)
    {
        return $this->likeHas($query, 'stockLocation', 'name', $where);
    }

    public function scopeWhereInputLocation($query, $where)
    {
        return $this->likeHas($query, 'inputLocation', 'name', $where);
    }

    public function scopeWhereQualityControlLocation($query, $where)
    {
        return $this->likeHas($query, 'qualityControlLocation', 'name', $where);
    }

    public function scopeWherePackingLocation($query, $where)
    {
        return $this->likeHas($query, 'packingLocation', 'name', $where);
    }

    public function scopeWhereOutputLocation($query, $where)
    {
        return $this->likeHas($query, 'outputLocation', 'name', $where);
    }

    public function scopeWhereStockAfterManufacturingLocation($query, $where)
    {
        return $this->likeHas($query, 'stockAfterManufacturingLocation', 'name', $where);
    }

    public function scopeWherePickingBeforeManufacturingLocation($query, $where)
    {
        return $this->likeHas($query, 'pickingBeforeManufacturingLocation', 'name', $where);
    }

    public function scopeWhereInType($query, $where)
    {
        return $this->likeHas($query, 'inType', 'name', $where);
    }

    public function scopeWhereInternalType($query, $where)
    {
        return $this->likeHas($query, 'internalType', 'name', $where);
    }

    public function scopeWherePickType($query, $where)
    {
        return $this->likeHas($query, 'pickType', 'name', $where);
    }

    public function scopeWherePackType($query, $where)
    {
        return $this->likeHas($query, 'packType', 'name', $where);
    }

    public function scopeWhereOutType($query, $where)
    {
        return $this->likeHas($query, 'outType', 'name', $where);
    }

    public function scopeWhereStockAfterManufacturingOperationType($query, $where)
    {
        return $this->likeHas($query, 'stockAfterManufacturingOperationType', 'name', $where);
    }

    public function scopeWherePickingBeforeManufacturing($query, $where)
    {
        return $this->likeHas($query, 'pickingBeforeManufacturing', 'name', $where);
    }

    public function scopeWhereManufacturingOperationType($query, $where)
    {
        return $this->likeHas($query, 'manufacturingOperationType', 'name', $where);
    }

    public function scopeOrderByViewLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'warehouses.view_location_id'), $order);
    }

    public function scopeOrderByStockLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'warehouses.stock_location_id'), $order);
    }

    public function scopeOrderByInputLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'warehouses.input_location_id'), $order);
    }

    public function scopeOrderByQualityControlLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'warehouses.quality_control_location_id'), $order);
    }

    public function scopeOrderByPackingLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'warehouses.packing_location_id'), $order);
    }

    public function scopeOrderByOutputLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'warehouses.output_location_id'), $order);
    }

    public function scopeOrderByStockAfterManufacturingLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'warehouses.stock_after_manufacturing_location_id'), $order);
    }

    public function scopeOrderByPickingBeforeManufacturingLocation($query, $order)
    {
        return $query->orderBy(Location::select('name')->whereColumn('locations.id', 'warehouses.picking_before_manufacturing_location_id'), $order);
    }

    public function scopeOrderByInType($query, $order)
    {
        return $query->orderBy(OperationType::select('name')->whereColumn('operations_types.id', 'warehouses.in_type_id'), $order);
    }

    public function scopeOrderByInternalType($query, $order)
    {
        return $query->orderBy(OperationType::select('name')->whereColumn('operations_types.id', 'warehouses.internal_type_id'), $order);
    }

    public function scopeOrderByPickType($query, $order)
    {
        return $query->orderBy(OperationType::select('name')->whereColumn('operations_types.id', 'warehouses.pick_type_id'), $order);
    }

    public function scopeOrderByPackType($query, $order)
    {
        return $query->orderBy(OperationType::select('name')->whereColumn('operations_types.id', 'warehouses.pack_type_id'), $order);
    }

    public function scopeOrderByOutType($query, $order)
    {
        return $query->orderBy(OperationType::select('name')->whereColumn('operations_types.id', 'warehouses.out_type_id'), $order);
    }

    public function scopeOrderByStockAfterManufacturing($query, $order)
    {
        return $query->orderBy(OperationType::select('name')->whereColumn('operations_types.id', 'warehouses.stock_after_manufacturing_operation_type_id'), $order);
    }

    public function scopeOrderByPickingBeforeManufacturing($query, $order)
    {
        return $query->orderBy(OperationType::select('name')->whereColumn('operations_types.id', 'warehouses.picking_before_manufacturing_operation_type_id'), $order);
    }

    public function scopeOrderByManufacturingOperationType($query, $order)
    {
        return $query->orderBy(OperationType::select('name')->whereColumn('operations_types.id', 'warehouses.manufacturing_operation_type_id'), $order);
    }
}

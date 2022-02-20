<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesOrderLine extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'sales_order_lines';
    protected $guarded = [];

    public function getSearchableAndSortableFields()
    {
        return [
            'product_id',
            'product',
            'description',
            'quantity',
            'measurement_id',
            'measurement',
            'unit_price',
            'subtotal',
            'sales_order_id',
            'sales_order',
        ];
    }

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function scopeWhereProductId($query, $where)
    {
        return $query->where('product_id', $where);
    }

    public function scopeWhereDescription($query, $where)
    {
        return $this->like($query, 'description', $where);
    }

    public function scopeWhereQuantity($query, $where)
    {
        return $this->like($query, 'quantity', $where);
    }

    public function scopeWhereMeasurementId($query, $where)
    {
        return $query->where('measurement_id', $where);
    }

    public function scopeWhereUnitPrice($query, $where)
    {
        return $this->like($query, 'unit_price', $where);
    }

    public function scopeWhereSubtotal($query, $where)
    {
        return $this->like($query, 'subtotal', $where);
    }

    public function scopeWhereSalesOrderId($query, $where)
    {
        return $query->where('sales_order_id', $where);
    }

    public function scopeOrderByProductId($query, $order)
    {
        return $query->orderBy('product_id', $order);
    }

    public function scopeOrderByDescription($query, $order)
    {
        return $query->orderBy('description', $order);
    }

    public function scopeOrderByQuantity($query, $order)
    {
        return $query->orderBy('quantity', $order);
    }

    public function scopeOrderByMeasurementId($query, $order)
    {
        return $query->orderBy('measurement_id', $order);
    }

    public function scopeOrderByUnitPrice($query, $order)
    {
        return $query->orderBy('unit_price', $order);
    }

    public function scopeOrderBySubtotal($query, $order)
    {
        return $query->orderBy('subtotal', $order);
    }

    public function scopeOrderBySalesOrderId($query, $order)
    {
        return $query->orderBy('sales_order_id', $order);
    }

    public function scopeWhereProduct($query, $where)
    {
        return $this->likeHas($query, 'product', 'name', $where);
    }

    public function scopeWhereMeasurement($query, $where)
    {
        return $this->likeHas($query, 'measurement', 'name', $where);
    }

    public function scopeWhereSalesOrder($query, $where)
    {
        return $this->likeHas($query, 'salesOrder', 'name', $where);
    }

    public function scopeOrderByProduct($query, $order)
    {
        return $query->orderBy(Product::select('name')->whereColumn('products.id', 'sales_order_lines.product_id'), $order);
    }

    public function scopeOrderByMeasurement($query, $order)
    {
        return $query->orderBy(Measurement::select('name')->whereColumn('measurements.id', 'sales_order_lines.measurement_id'), $order);
    }

    public function scopeOrderBySalesOrder($query, $order)
    {
        return $query->orderBy(SalesOrder::select('number')->whereColumn('sales_orders.id', 'sales_order_lines.sales_order_id'), $order);
    }

    public function scopeInsertMany($query, $data, $salesOrderId)
    {
        $salesOrderLineInsert = [];
        foreach ($data as $datum) {
            $salesOrderLine = new SalesOrderLine();
            $salesOrderLine->product_id = $datum['product_id'];
            $salesOrderLine->description = $datum['description'];
            $salesOrderLine->quantity = $datum['quantity'];
            $salesOrderLine->measurement_id = $datum['measurement_id'];
            $salesOrderLine->unit_price = $datum['unit_price'];
            $salesOrderLine->subtotal = $salesOrderLine->unit_price * $salesOrderLine->quantity;
            $salesOrderLine->sales_order_id = $salesOrderId;
            $salesOrderLineInsert[] = $salesOrderLine->attributesToArray();
        }
        SalesOrderLine::insert($salesOrderLineInsert);
    }
}

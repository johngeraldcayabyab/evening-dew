<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class   SalesOrderLine extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'sales_order_lines';
    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function scopeWhereProductId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereDescription($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereQuantity($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereMeasurementId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereUnitPrice($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSubtotal($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSalesOrderId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeOrderByProductId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByDescription($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByQuantity($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMeasurementId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByUnitPrice($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySubtotal($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySalesOrderId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereProduct($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereMeasurement($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeWhereSalesOrder($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'number', $where);
    }

    public function scopeOrderByProduct($query, $order)
    {
        return $this->orderHas($query, new Product(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderByMeasurement($query, $order)
    {
        return $this->orderHas($query, new Measurement(), 'name', __FUNCTION__, $order);
    }

    public function scopeOrderBySalesOrder($query, $order)
    {
        return $this->orderHas($query, new SalesOrder(), 'number', __FUNCTION__, $order);
    }

    public function scopeInsertMany($query, $data, $salesOrderId)
    {
        $salesOrderLines = [];
        $date = now();
        foreach ($data as $datum) {
            $salesOrderLine = new SalesOrderLine();
            $salesOrderLine->product_id = $datum['product_id'];
            $salesOrderLine->description = isset($datum['description']) ? $datum['description'] : null;
            $salesOrderLine->quantity = $datum['quantity'];
            $salesOrderLine->measurement_id = $datum['measurement_id'];
            $salesOrderLine->unit_price = $datum['unit_price'];
            $salesOrderLine->subtotal = $salesOrderLine->unit_price * $salesOrderLine->quantity;
            $salesOrderLine->sales_order_id = $salesOrderId;
            $salesOrderLine->created_at = $date;
            $salesOrderLine->updated_at = $date;
            $salesOrderLines[] = $salesOrderLine->attributesToArray();
        }
        $query->insert($salesOrderLines);
    }

    public function scopeUpdateOrCreateMany($query, $data, $salesOrderId)
    {
        $salesOrderLines = [];
        $date = now();
        foreach ($data as $datum) {
            $salesOrderLine = new SalesOrderLine();
            $salesOrderLine->id = isset($datum['id']) ? $datum['id'] : null;
            $salesOrderLine->product_id = $datum['product_id'];
            $salesOrderLine->description = isset($datum['description']) ? $datum['description'] : null;
            $salesOrderLine->quantity = $datum['quantity'];
            $salesOrderLine->measurement_id = $datum['measurement_id'];
            $salesOrderLine->unit_price = $datum['unit_price'];
            $salesOrderLine->subtotal = $salesOrderLine->unit_price * $salesOrderLine->quantity;
            $salesOrderLine->sales_order_id = $salesOrderId;
            $salesOrderLine->updated_at = $date;
            $salesOrderLines[] = $salesOrderLine->attributesToArray();
        }
        $query->upsert($salesOrderLines, ['id']);
    }
}

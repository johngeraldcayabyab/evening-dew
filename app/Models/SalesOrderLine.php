<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class SalesOrderLine extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;
    use LogsActivity;

    protected $table = 'sales_order_lines';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

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
        $transactionLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'product_id' => $datum['product_id'],
                'description' => isset($datum['description']) ? $datum['description'] : null,
                'quantity' => $datum['quantity'],
                'measurement_id' => $datum['measurement_id'],
                'unit_price' => $datum['unit_price'],
                'subtotal' => $datum['unit_price'] * $datum['quantity'],
                'sales_order_id' => $salesOrderId,
                'created_at' => $date,
                'updated_at' => $date,
            ];
            $transactionLines[] = $transactionLine;
        }
        $query->insert($transactionLines);
        return $query;
    }

    public function scopeUpdateOrCreateMany($query, $data, $salesOrderId)
    {
        $transactionLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'id' => isset($datum['id']) ? $datum['id'] : null,
                'product_id' => $datum['product_id'],
                'description' => isset($datum['description']) ? $datum['description'] : null,
                'quantity' => $datum['quantity'],
                'measurement_id' => $datum['measurement_id'],
                'unit_price' => $datum['unit_price'],
                'subtotal' => $datum['unit_price'] * $datum['quantity'],
                'sales_order_id' => $salesOrderId,
                'updated_at' => $date,
            ];
            if (isset($datum['id'])) {
                $transactionLine['created_at'] = $date;
            }
            $transactionLines[] = $transactionLine;
        }
        $query->upsert($transactionLines, ['id']);
        return $query;
    }
}

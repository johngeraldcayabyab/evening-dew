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

    public function scopeWhereProductId($query, $productId)
    {
        return $query->where('product_id', $productId);
    }

    public function scopeWhereDescription($query, $description)
    {
        return $query->where('description', 'like', "%$description%");
    }

    public function scopeWhereQuantity($query, $quantity)
    {
        return $query->where('quantity', 'like', "%$quantity%");
    }

    public function scopeWhereMeasurementId($query, $measurementId)
    {
        return $query->where('measurement_id', $measurementId);
    }

    public function scopeWhereUnitPrice($query, $unitPrice)
    {
        return $query->where('unit_price', 'like', "%$unitPrice%");
    }

    public function scopeWhereSubtotal($query, $subTotal)
    {
        return $query->where('subtotal', 'like', "%$subTotal%");
    }

    public function scopeWhereSalesOrderId($query, $salesOrderId)
    {
        return $query->where('sales_order_id', $salesOrderId);
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

    public function scopeWhereProduct($query, $product)
    {
        return $query->whereHas('product', function ($query) use ($product) {
            return $query->where('name', 'like', "%$product%");
        });
    }

    public function scopeWhereMeasurement($query, $measurement)
    {
        return $query->whereHas('measurement', function ($query) use ($measurement) {
            return $query->where('name', 'like', "%$measurement%");
        });
    }

    public function scopeWhereSalesOrder($query, $salesOrder)
    {
        return $query->whereHas('salesOrder', function ($query) use ($salesOrder) {
            return $query->where('number', 'like', "%$salesOrder%");
        });
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

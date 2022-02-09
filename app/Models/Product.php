<?php

namespace App\Models;

use App\Traits\TimeStampOrderTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use TimeStampOrderTrait;

    const STORABLE = 'storable';
    const CONSUMABLE = 'consumable';
    const SERVICE = 'service';

    const ORDERED_QUANTITIES = 'ordered_quantities';
    const DELIVERED_QUANTITIES = 'delivered_quantities';

    protected $table = 'products';
    protected $guarded = [];

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function purchaseMeasurement()
    {
        return $this->belongsTo(Measurement::class, 'purchase_measurement_id', 'id');
    }

    public function salesMeasurement()
    {
        return $this->belongsTo(Measurement::class, 'sales_measurement_id', 'id');
    }

    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public static function getProductTypes()
    {
        return [self::STORABLE, self::CONSUMABLE, self::SERVICE];
    }

    public static function getInvoicingPolicies()
    {
        return [self::ORDERED_QUANTITIES, self::DELIVERED_QUANTITIES];
    }

    public function scopeWhereName($query, $name)
    {
        return $query->where('type', 'name', "%$name%");
    }

    public function scopeWhereProductType($query, $productType)
    {
        return $query->where('type', 'product_type', "%$productType%");
    }

    public function scopeWhereInvoicingPolicy($query, $invoicingPolicy)
    {
        return $query->where('type', 'invoicing_policy', "%$invoicingPolicy%");
    }

    public function scopeWhereCost($query, $cost)
    {
        return $query->where('type', 'cost', "%$cost%");
    }

    public function scopeWhereSalesPrice($query, $salesPrice)
    {
        return $query->where('type', 'sales_price', "%$salesPrice%");
    }

    public function scopeWhereMeasurement($query, $measurement)
    {
        return $query->whereHas('measurement', function ($query) use ($measurement) {
            return $query->where('name', 'like', "%$measurement%");
        });
    }

    public function scopeWherePurchaseMeasurement($query, $purchaseMeasurement)
    {
        return $query->whereHas('purchase_measurement', function ($query) use ($purchaseMeasurement) {
            return $query->where('name', 'like', "%$purchaseMeasurement%");
        });
    }

    public function scopeWhereSalesMeasurement($query, $salesMeasurement)
    {
        return $query->whereHas('purchase_measurement', function ($query) use ($salesMeasurement) {
            return $query->where('name', 'like', "%$salesMeasurement%");
        });
    }

    public function scopeWhereProductCategory($query, $productCategory)
    {
        return $query->whereHas('product_category', function ($query) use ($productCategory) {
            return $query->where('category', 'like', "%$productCategory%");
        });
    }

    public function scopeWhereInternalReference($query, $internalReference)
    {
        return $query->where('type', 'internal_reference', "%$internalReference%");
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }

    public function scopeOrderByProductType($query, $order)
    {
        return $query->orderBy('type', $order);
    }

    public function scopeOrderByInvoicingPolicy($query, $order)
    {
        return $query->orderBy('invoicing_policy', $order);
    }

    public function scopeOrderByCost($query, $order)
    {
        return $query->orderBy('cost', $order);
    }

    public function scopeOrderBySalesPrice($query, $order)
    {
        return $query->orderBy('sales_price', $order);
    }

    public function scopeOrderByMeasurement($query, $order)
    {
        return $query->orderBy(Measurement::select('name')->whereColumn('measurements.id', 'products.measurement_id'), $order);
    }

    public function scopeOrderByPurchaseMeasurement($query, $order)
    {
        return $query->orderBy(Measurement::select('name')->whereColumn('measurements.id', 'products.measurement_id'), $order);
    }

    public function scopeOrderBySalesMeasurement($query, $order)
    {
        return $query->orderBy(Measurement::select('name')->whereColumn('measurements.id', 'products.measurement_id'), $order);
    }

    public function scopeOrderByProductCategory($query, $order)
    {
        return $query->orderBy(ProductCategory::select('category')->whereColumn('product_categories.id', 'products.product_category_id'), $order);
    }

    public function scopeOrderByInternalReference($query, $order)
    {
        return $query->orderBy('internal_references', $order);
    }
}

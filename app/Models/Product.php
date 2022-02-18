<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    const STORABLE = 'storable';
    const CONSUMABLE = 'consumable';
    const SERVICE = 'service';

    const ORDERED_QUANTITIES = 'ordered_quantities';
    const DELIVERED_QUANTITIES = 'delivered_quantities';

    protected $table = 'products';
    protected $guarded = [];

    public function getSearchableAndSortableFields()
    {
        return [
            'name',
            'product_type',
            'invoicing_policy',
            'cost',
            'sales_price',
            'measurement',
            'purchase_measurement',
            'sales_measurement',
            'product_category',
            'internal_reference',
            'measurement_id',
            'purchase_measurement_id',
            'sales_measurement_id',
            'product_category_id',
        ];
    }

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

    public function scopeWhereName($query, $where)
    {
        return $query->where('name', 'like', "%$where%");
    }

    public function scopeWhereProductType($query, $where)
    {
        return $query->where('product_type', 'like', "%$where%");
    }

    public function scopeWhereInvoicingPolicy($query, $where)
    {
        return $query->where('invoicing_policy', 'like', "%$where%");
    }

    public function scopeWhereCost($query, $where)
    {
        return $query->where('cost', 'like', "%$where%");
    }

    public function scopeWhereSalesPrice($query, $where)
    {
        return $query->where('sales_price', 'like', "%$where%");
    }

    public function scopeWhereMeasurement($query, $where)
    {
        return $query->whereHas('measurement', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWherePurchaseMeasurement($query, $where)
    {
        return $query->whereHas('purchaseMeasurement', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWhereSalesMeasurement($query, $where)
    {
        return $query->whereHas('salesMeasurement', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWhereProductCategory($query, $where)
    {
        return $query->whereHas('productCategory', function ($query) use ($where) {
            return $query->where('category', 'like', "%$where%");
        });
    }

    public function scopeWhereInternalReference($query, $where)
    {
        return $query->where('internal_reference', 'like', "%$where%");
    }

    public function scopeWhereSalesDescription($query, $where)
    {
        return $query->where('sales_description', 'like', "%$where%");
    }

    public function scopeWherePurchaseDescription($query, $where)
    {
        return $query->where('purchase_description', 'like', "%$where%");
    }

    public function scopeWhereMeasurementId($query, $where)
    {
        return $query->where('measurement_id', $where);
    }

    public function scopeWherePurchaseMeasurementId($query, $where)
    {
        return $query->where('purchase_measurement_id', $where);
    }

    public function scopeWhereSalesMeasurementId($query, $where)
    {
        return $query->where('sales_measurement_id', $where);
    }

    public function scopeWhereProductCategoryId($query, $where)
    {
        return $query->where('product_category_id', $where);
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

    public function scopeOrderBySalesDescription($query, $order)
    {
        return $query->orderBy('sales_description', $order);
    }

    public function scopeOrderByPurchaseDescription($query, $order)
    {
        return $query->orderBy('purchase_description', $order);
    }

    public function scopeOrderByMeasurementId($query, $order)
    {
        return $query->orderBy('measurement_id', $order);
    }

    public function scopeOrderByPurchaseMeasurementId($query, $order)
    {
        return $query->orderBy('purchase_measurement_id', $order);
    }

    public function scopeOrderBySalesMeasurementId($query, $order)
    {
        return $query->orderBy('sales_measurement_id', $order);
    }

    public function scopeOrderByProductCategoryId($query, $order)
    {
        return $query->orderBy('product_category_id', $order);
    }
}

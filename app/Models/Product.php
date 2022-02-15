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

    public function scopeWhereName($query, $name)
    {
        return $query->where('name', 'like', "%$name%");
    }

    public function scopeWhereProductType($query, $productType)
    {
        return $query->where('product_type', 'like', "%$productType%");
    }

    public function scopeWhereInvoicingPolicy($query, $invoicingPolicy)
    {
        return $query->where('invoicing_policy', 'like', "%$invoicingPolicy%");
    }

    public function scopeWhereCost($query, $cost)
    {
        return $query->where('cost', 'like', "%$cost%");
    }

    public function scopeWhereSalesPrice($query, $salesPrice)
    {
        return $query->where('sales_price', 'like', "%$salesPrice%");
    }

    public function scopeWhereMeasurement($query, $measurement)
    {
        return $query->whereHas('measurement', function ($query) use ($measurement) {
            return $query->where('name', 'like', "%$measurement%");
        });
    }

    public function scopeWherePurchaseMeasurement($query, $purchaseMeasurement)
    {
        return $query->whereHas('purchaseMeasurement', function ($query) use ($purchaseMeasurement) {
            return $query->where('name', 'like', "%$purchaseMeasurement%");
        });
    }

    public function scopeWhereSalesMeasurement($query, $salesMeasurement)
    {
        return $query->whereHas('salesMeasurement', function ($query) use ($salesMeasurement) {
            return $query->where('name', 'like', "%$salesMeasurement%");
        });
    }

    public function scopeWhereProductCategory($query, $productCategory)
    {
        return $query->whereHas('productCategory', function ($query) use ($productCategory) {
            return $query->where('category', 'like', "%$productCategory%");
        });
    }

    public function scopeWhereInternalReference($query, $internalReference)
    {
        return $query->where('internal_reference', 'like', "%$internalReference%");
    }

    public function scopeWhereSalesDescription($query, $salesDescription)
    {
        return $query->where('sales_description', 'like', "%$salesDescription%");
    }

    public function scopeWherePurchaseDescription($query, $purchaseDescription)
    {
        return $query->where('purchase_description', 'like', "%$purchaseDescription%");
    }

    public function scopeWhereMeasurementId($query, $measurementId)
    {
        return $query->where('measurement_id', $measurementId);
    }

    public function scopeWherePurchaseMeasurementId($query, $purchaseMeasurementId)
    {
        return $query->where('purchase_measurement_id', $purchaseMeasurementId);
    }

    public function scopeWhereSalesMeasurementId($query, $salesMeasurementId)
    {
        return $query->where('sales_measurement_id', $salesMeasurementId);
    }

    public function scopeWhereProductCategoryId($query, $productCategoryId)
    {
        return $query->where('product_category_id', $productCategoryId);
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

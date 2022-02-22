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
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereProductType($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereInvoicingPolicy($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereCost($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSalesPrice($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereMeasurement($query, $where)
    {
        return $this->likeHas($query, 'measurement', 'name', $where);
    }

    public function scopeWherePurchaseMeasurement($query, $where)
    {
        return $this->likeHas($query, 'purchaseMeasurement', 'name', $where);
    }

    public function scopeWhereSalesMeasurement($query, $where)
    {
        return $this->likeHas($query, 'salesMeasurement', 'name', $where);
    }

    public function scopeWhereProductCategory($query, $where)
    {
        return $this->likeHas($query, 'productCategory', 'category', $where);
    }

    public function scopeWhereInternalReference($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSalesDescription($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWherePurchaseDescription($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereMeasurementId($query, $where)
    {
        return $this->whereId($query, __FUNCTION__, $where);
    }

    public function scopeWherePurchaseMeasurementId($query, $where)
    {
        return $this->whereId($query, __FUNCTION__, $where);
    }

    public function scopeWhereSalesMeasurementId($query, $where)
    {
        return $this->whereId($query, __FUNCTION__, $where);
    }

    public function scopeWhereProductCategoryId($query, $where)
    {
        return $this->whereId($query, __FUNCTION__, $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByProductType($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByInvoicingPolicy($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByCost($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySalesPrice($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMeasurement($query, $order)
    {
        return $this->orderHas($query, new Measurement(), 'name', "measurement_id", $order);
    }

    public function scopeOrderByPurchaseMeasurement($query, $order)
    {
        return $this->orderHas($query, new Measurement(), 'name', "measurement_id", $order);
    }

    public function scopeOrderBySalesMeasurement($query, $order)
    {
        return $this->orderHas($query, new Measurement(), 'name', "measurement_id", $order);
    }

    public function scopeOrderByProductCategory($query, $order)
    {
        return $this->orderHas($query, new ProductCategory(), 'category', "product_category_id", $order);
    }

    public function scopeOrderByInternalReference($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySalesDescription($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPurchaseDescription($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMeasurementId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPurchaseMeasurementId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySalesMeasurementId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByProductCategoryId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }
}

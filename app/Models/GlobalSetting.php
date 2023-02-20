<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class GlobalSetting extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'global_settings';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function scopeLatestFirst($query)
    {
        return $query->orderBy('id', 'desc')->first();
    }

    public function inventoryDefaultMeasurementCategory()
    {
        return $this->belongsTo(MeasurementCategory::class, 'inventory_default_measurement_category_id', 'id');
    }

    public function inventoryDefaultMeasurement()
    {
        return $this->belongsTo(Measurement::class, 'inventory_default_measurement_id', 'id');
    }

    public function inventoryDefaultPurchaseMeasurement()
    {
        return $this->belongsTo(Measurement::class, 'inventory_default_purchase_measurement_id', 'id');
    }

    public function inventoryDefaultSalesMeasurement()
    {
        return $this->belongsTo(Measurement::class, 'inventory_default_sales_measurement_id', 'id');
    }

    public function inventoryDefaultProductCategory()
    {
        return $this->belongsTo(ProductCategory::class, 'inventory_default_product_category_id', 'id');
    }

    public function inventoryDefaultCustomerLocation()
    {
        return $this->belongsTo(Location::class, 'inventory_default_customer_location_id', 'id');
    }

    public function inventoryDefaultVendorLocation()
    {
        return $this->belongsTo(Location::class, 'inventory_default_vendor_location_id', 'id');
    }

    public function inventoryDefaultInventoryAdjustment()
    {
        return $this->belongsTo(Location::class, 'inventory_default_adjustment_location_id', 'id');
    }

    public function inventoryDefaultProduction()
    {
        return $this->belongsTo(Location::class, 'inventory_default_production_id', 'id');
    }

    public function inventoryDefaultScrap()
    {
        return $this->belongsTo(Location::class, 'inventory_default_scrap_id', 'id');
    }

    public function inventoryDefaultWarehouse()
    {
        return $this->belongsTo(Warehouse::class, 'inventory_default_warehouse_id', 'id');
    }

    public function accountingDefaultCurrency()
    {
        return $this->belongsTo(Currency::class, 'accounting_default_currency_id', 'id');
    }

    public function generalDefaultCountry()
    {
        return $this->belongsTo(Country::class, 'general_default_country_id', 'id');
    }

    public function salesOrderDefaultSequence()
    {
        return $this->belongsTo(Sequence::class, 'sales_order_default_sequence_id', 'id');
    }

    public function salesOrderDefaultDeliveryFee()
    {
        return $this->belongsTo(DeliveryFee::class, 'sales_order_default_delivery_fee', 'id');
    }
}

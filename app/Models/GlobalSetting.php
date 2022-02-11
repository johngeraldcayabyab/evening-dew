<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GlobalSetting extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'global_settings';
    protected $guarded = [];

    public function scopeInventoryDefaultMeasurementCategory($query)
    {
        return $query->latest()->first()->inventory_default_measurement_category_id;
    }

    public function scopeInventoryDefaultMeasurement($query)
    {
        return $query->latest()->first()->inventory_default_measurement_id;
    }

    public function scopeInventoryDefaultPurchaseMeasurement($query)
    {
        return $query->latest()->first()->inventory_default_purchase_measurement_id;
    }

    public function scopeInventoryDefaultSalesMeasurement($query)
    {
        return $query->latest()->first()->inventory_default_sales_measurement_id;
    }

    public function scopeInventoryDefaultProductCategory($query)
    {
        return $query->latest()->first()->inventory_default_product_category_id;
    }

    public function scopeAccountingDefaultCurrency($query)
    {
        return $query->latest()->first()->accounting_default_currency_id;
    }

    public function scopeGeneralDefaultCountry($query)
    {
        return $query->latest()->first()->general_default_country_id;
    }
}

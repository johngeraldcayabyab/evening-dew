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

    public function inventoryDefaultPurchaseMeasurement()
    {
        return $this->belongsTo(Measurement::class, 'inventory_default_purchase_measurement_id', 'id');
    }

    public function inventoryDefaultSalesMeasurement()
    {
        return $this->belongsTo(Measurement::class, 'inventory_default_sales_measurement_id', 'id');
    }

    public function salesOrderDefaultDeliveryFee()
    {
        return $this->belongsTo(DeliveryFee::class, 'sales_order_default_delivery_fee', 'id');
    }
}

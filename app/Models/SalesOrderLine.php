<?php

namespace App\Models;

use App\Data\SystemSetting;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Carbon\Carbon;
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
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

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

    public function scopeMassUpsert($query, $data, $parent)
    {
        $globalSetting = GlobalSetting::latestFirst();
        $inventoryDefaultMeasurement = $globalSetting->inventoryDefaultMeasurement;
        $measurementId = $inventoryDefaultMeasurement->id;
        $lines = [];
        $subtotal = 0;
        foreach ($data as $datum) {
            $unitPrice = (float)str_replace(',', '', $datum['unit_price']);
            $measurementId = $datum['measurement_id'] ?? $measurementId;
            $line = [
                'id' => $datum['id'] ?? null,
                'product_id' => $datum['product_id'],
                'description' => $datum['description'] ?? null,
                'quantity' => $datum['quantity'],
                'measurement_id' => $measurementId,
                'unit_price' => $unitPrice,
                'subtotal' => $unitPrice * $datum['quantity'],
                'shipping_date' => isset($datum['shipping_date']) ? Carbon::parse($datum['shipping_date'])->format(SystemSetting::DATE_TIME_FORMAT) : $parent->shipping_date,
                'sales_order_id' => $parent->id,
            ];
            $lines[] = $line;
            $subtotal += $line['subtotal'];
        }
        $query->upsert($lines, ['id']);
        $parent->subtotal = $subtotal;
        $parent->save();
        return $query;
    }
}

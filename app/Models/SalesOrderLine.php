<?php

namespace App\Models;

use App\Data\SystemSetting;
use App\Services\Financial;
use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesOrderLine extends Model
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'sales_order_lines';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'quantity' => 'double',
        'unit_price' => 'double',
        'subtotal' => 'double',
    ];

    const PERCENTAGE = 'percentage';
    const FIXED = 'fixed';

    public static function getDiscountTypes()
    {
        return [self::PERCENTAGE, self::FIXED];
    }

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

    public function tax()
    {
        return $this->belongsTo(Tax::class);
    }

    public function scopeMassUpsert($query, $data, $parent)
    {
        $defaultMeasurement = Measurement::default();
        $measurementId = $defaultMeasurement->id;
        $lines = collect($data)->map(function ($datum) use ($measurementId, $parent) {
            $unitPrice = (float)str_replace(',', '', $datum['unit_price']);
            $measurementId = $datum['measurement_id'] ?? $measurementId;
            $shippingDate = $datum['shipping_date'] ?? $parent->shipping_date;
            $computation = Financial::computeSalesOrderLineSubtotal($datum);
            return [
                'id' => $datum['id'] ?? null,
                'product_id' => $datum['product_id'],
                'description' => $datum['description'] ?? null,
                'quantity' => $datum['quantity'],
                'measurement_id' => $measurementId,
                'unit_price' => $unitPrice,
                'discounted_unit_price' => $computation['discounted_unit_price'],
                'tax_id' => $datum['tax_id'] ?? null,
                'taxable_amount' => $computation['taxable_amount'],
                'tax_amount' => $computation['tax_amount'],
                'subtotal' => $computation['subtotal'],
                'shipping_date' => Carbon::parse($shippingDate)->format(SystemSetting::DATE_TIME_FORMAT),
                'discount_type' => $datum['discount_type'] ?? null,
                'discount_rate' => $datum['discount_rate'] ?? null,
                'sales_order_id' => $parent->id,
            ];
        })->toArray();
        $query->upsert($lines, ['id']);
        return $query;
    }
}

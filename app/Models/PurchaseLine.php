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
use Illuminate\Support\Arr;

class PurchaseLine extends Model
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'purchase_lines';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'quantity' => 'double',
        'unit_price' => 'double',
        'subtotal' => 'double',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function purchase()
    {
        return $this->belongsTo(Purchase::class);
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
            $receivingDate = $datum['receiving_date'] ?? $parent->shipping_date;
            $computation = Financial::computePurchaseLineSubtotal($datum);
            return [
                'id' => $datum['id'] ?? null,
                'product_id' => $datum['product_id'],
                'description' => $datum['description'] ?? null,
                'quantity' => $datum['quantity'],
                'measurement_id' => $measurementId,
                'unit_price' => $unitPrice,
                'taxable_amount' => $computation['taxable_amount'],
                'tax_amount' => $computation['tax_amount'],
                'subtotal' => $computation['subtotal'],
                'receiving_date' => Carbon::parse($receivingDate)->format(SystemSetting::DATE_TIME_FORMAT),
                'tax_id' => $datum['tax_id'] ?? null,
                'purchase_id' => $parent->id,
            ];
        })->toArray();
        $query->upsert($lines, ['id']);
        $lineSubtotal = Arr::pluck($lines, 'subtotal');
        $subTotal = collect($lineSubtotal)->sum();
        $parent->subtotal = $subTotal;
        $parent->save();
        return $query;
    }
}

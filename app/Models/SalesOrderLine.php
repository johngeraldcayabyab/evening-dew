<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
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

    public function scopeInsertMany($query, $data, $salesOrderId)
    {
        $transactionLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'product_id' => $datum['product_id'],
                'description' => isset($datum['description']) ? $datum['description'] : null,
                'quantity' => $datum['quantity'],
                'measurement_id' => $datum['measurement_id'],
                'unit_price' => $datum['unit_price'],
                'subtotal' => $datum['unit_price'] * $datum['quantity'],
                'sales_order_id' => $salesOrderId,
                'created_at' => $date,
                'updated_at' => $date,
            ];
            $transactionLines[] = $transactionLine;
        }
        $query->insert($transactionLines);
        return $query;
    }

    public function scopeUpdateOrCreateMany($query, $data, $salesOrderId)
    {
        $transactionLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'id' => isset($datum['id']) ? $datum['id'] : null,
                'product_id' => $datum['product_id'],
                'description' => isset($datum['description']) ? $datum['description'] : null,
                'quantity' => $datum['quantity'],
                'measurement_id' => $datum['measurement_id'],
                'unit_price' => $datum['unit_price'],
                'subtotal' => $datum['unit_price'] * $datum['quantity'],
                'sales_order_id' => $salesOrderId,
                'updated_at' => $date,
            ];
            if (isset($datum['id'])) {
                $transactionLine['created_at'] = $date;
            }
            $transactionLines[] = $transactionLine;
        }
        $query->upsert($transactionLines, ['id']);
        return $query;
    }
}

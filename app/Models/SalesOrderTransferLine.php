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

class SalesOrderTransferLine extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'sales_order_transfer_line';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function transfer()
    {
        return $this->belongsTo(Transfer::class);
    }

    public function salesOrderLine()
    {
        return $this->belongsTo(SalesOrderLine::class);
    }

    public function transferLine()
    {
        return $this->belongsTo(TransferLine::class);
    }

    public function scopeMatchSalesOrderOrTransferLines
    (
        $salesOrderTransfer,
        $salesOrder,
        $transfer,
        $theLines,
        $modelLine,
        $lineField
    )
    {
        $lines = [];
        foreach ($theLines as $theLine) {
            $salesOrderLine = $modelLine
                ->where($lineField, $salesOrder->id)
                ->where('product_id', $theLine->product_id)
                ->where('created_at', $theLine->created_at)
                ->first();
            $lines[] = [
                'sales_order_id' => $salesOrder->id,
                'transfer_id' => $transfer->id,
                'sales_order_line_id' => $salesOrderLine->id,
                'transfer_line_id' => $theLine->id,
                'sales_order_transfer_id' => $salesOrderTransfer->id,
            ];
        }
        if (count($lines)) {
            SalesOrderTransferLine::massUpsert($lines, $salesOrderTransfer);
        }
    }

    public function scopeMassUpsert($query, $data, $parent)
    {
        $lines = [];
        $date = now();
        foreach ($data as $datum) {
            $line = [
                'id' => isset($datum['id']) ? $datum['id'] : null,
                'sales_order_id' => $datum['sales_order_id'],
                'transfer_id' => $datum['transfer_id'],
                'sales_order_line_id' => $datum['sales_order_line_id'],
                'transfer_line_id' => $datum['transfer_line_id'],
                'sales_order_transfer_id' => $parent->id,
                'updated_at' => $datum['updated_at'] ?? $date,
            ];
            if (!isset($datum['id'])) {
                $line['created_at'] = $datum['created_at'] ?? $date;
            }
            $lines[] = $line;
        }
        $query->upsert($lines, ['id']);
        return $query;
    }
}

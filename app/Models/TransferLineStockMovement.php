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

class TransferLineStockMovement extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'transfer_lines_stock_movement';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function transfer()
    {
        return $this->belongsTo(Transfer::class);
    }

    public function transferLine()
    {
        return $this->belongsTo(TransferLine::class);
    }

    public function stockMovement()
    {
        return $this->belongsTo(StockMovement::class);
    }

    public function scopeMassUpsert($query, $data)
    {
        $lines = collect($data)->map(fn($datum) => [
            'id' => $datum['id'] ?? null,
            'transfer_id' => $datum['transfer_id'],
            'transfer_line_id' => $datum['transfer_line_id'],
            'stock_movement_id' => $datum['stock_movement_id'],
        ])->toArray();
        $query->upsert($lines, ['id']);
        return $query;
    }
}

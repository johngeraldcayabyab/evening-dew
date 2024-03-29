<?php

namespace App\Models;

use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockMovement extends Model
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'stock_movements';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'quantity_done' => 'double',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function sourceLocation()
    {
        return $this->belongsTo(Location::class, 'source_location_id', 'id');
    }

    public function destinationLocation()
    {
        return $this->belongsTo(Location::class, 'destination_location_id', 'id');
    }

    public function scopeMassUpsert($query, $data)
    {
        $transactionLines = [];
        foreach ($data as $datum) {
            $transactionLine = [
                'id' => isset($datum['id']) ? $datum['id'] : null,
                'reference' => $datum['reference'],
                'source' => $datum['source'],
                'product_id' => $datum['product_id'],
                'source_location_id' => $datum['source_location_id'],
                'destination_location_id' => $datum['destination_location_id'],
                'quantity_done' => $datum['quantity_done'],
            ];
            $transactionLines[] = $transactionLine;
        }
        $query->upsert($transactionLines, ['id']);
        return $query;
    }

    public function slug()
    {
        return 'reference';
    }
}

<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class TransferLine extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;

    protected $table = 'transfer_lines';
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

    public function transfer()
    {
        return $this->belongsTo(Transfer::class);
    }

    public function scopeInsertMany($query, $data, $transferId)
    {
        $lines = [];
        $date = now();
        foreach ($data as $datum) {
            $line = [
                'product_id' => $datum['product_id'],
                'description' => isset($datum['description']) ? $datum['description'] : null,
                'demand' => $datum['demand'],
                'measurement_id' => $datum['measurement_id'],
                'transfer_id' => $transferId,
                'created_at' => $date,
                'updated_at' => $date,
            ];
            $lines[] = $line;
        }
        $query->insert($lines);
        return $query;
    }

    public function scopeUpdateOrCreateMany($query, $data, $transferId)
    {
        $lines = [];
        $date = now();
        foreach ($data as $datum) {
            $line = [
                'id' => isset($datum['id']) ? $datum['id'] : null,
                'product_id' => $datum['product_id'],
                'description' => isset($datum['description']) ? $datum['description'] : null,
                'demand' => $datum['demand'],
                'measurement_id' => $datum['measurement_id'],
                'transfer_id' => $transferId,
                'updated_at' => $date,
            ];
            if (isset($datum['id'])) {
                $line['created_at'] = $date;
            }
            $lines[] = $line;
        }
        $query->upsert($lines, ['id']);
        return $query;
    }
}

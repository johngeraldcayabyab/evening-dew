<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class AdjustmentLine extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;

    protected $table = 'adjustment_lines';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function adjustment()
    {
        return $this->belongsTo(Adjustment::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function scopeInsertMany($query, $data, $parentId)
    {
        $lines = [];
        $date = now();
        foreach ($data as $datum) {
            $line = [
                'location_id' => $datum['product_id'],
                'product_id' => $datum['quantity'],
                'measurement_id' => $datum['measurement_id'],
                'quantity_on_hand' => $datum['quantity_on_hand'],
                'quantity_counted' => $datum['quantity_counted'],
                'adjustment_id' => $parentId,
                'created_at' => $date,
                'updated_at' => $date,
            ];
            $lines[] = $line;
        }
        $query->insert($lines);
        return $query;
    }

    public function scopeUpdateOrCreateMany($query, $data, $parentId)
    {
        $lines = [];
        $date = now();
        foreach ($data as $datum) {
            $line = [
                'id' => isset($datum['id']) ? $datum['id'] : null,
                'product_id' => $datum['product_id'],
                'location_id' => $datum['location_id'],
                'measurement_id' => $datum['measurement_id'],
                'quantity_on_hand' => $datum['quantity_on_hand'],
                'quantity_counted' => $datum['quantity_counted'],
                'adjustment_id' => $parentId,
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

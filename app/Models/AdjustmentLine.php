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

    public function scopeInsertMany($query, $data, $materialId)
    {
        $materialLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'product_id' => $datum['product_id'],
                'quantity' => $datum['quantity'],
                'measurement_id' => $datum['measurement_id'],
                'material_id' => $materialId,
                'created_at' => $date,
                'updated_at' => $date,
            ];
            $materialLines[] = $transactionLine;
        }
        $query->insert($materialLines);
        return $query;
    }

    public function scopeUpdateOrCreateMany($query, $data, $materialId)
    {
        $materialLines = [];
        $date = now();
        foreach ($data as $datum) {
            $transactionLine = [
                'id' => isset($datum['id']) ? $datum['id'] : null,
                'product_id' => $datum['product_id'],
                'quantity' => $datum['quantity'],
                'measurement_id' => $datum['measurement_id'],
                'material_id' => $materialId,
                'updated_at' => $date,
            ];
            if (isset($datum['id'])) {
                $transactionLine['created_at'] = $date;
            }
            $materialLines[] = $transactionLine;
        }
        $query->upsert($materialLines, ['id']);
        return $query;
    }
}

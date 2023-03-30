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

class TransferLine extends Model
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'transfer_lines';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'demand' => 'double',
    ];

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

    public function scopeMassUpsert($query, $data, $parent)
    {
        $lines = collect($data)->map(fn($datum) => [
            'id' => $datum['id'] ?? null,
            'product_id' => $datum['product_id'],
            'description' => $datum['description'] ?? null,
            'demand' => $datum['demand'],
            'measurement_id' => $datum['measurement_id'],
            'transfer_id' => $parent->id,
        ])->toArray();
        $query->upsert($lines, ['id']);
        return $query;
    }
}

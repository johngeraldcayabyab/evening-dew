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

class DeliveryFeeLine extends Model
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'delivery_fee_lines';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function deliveryFee()
    {
        return $this->belongsTo(DeliveryFee::class);
    }

    public function scopeMassUpsert($query, $data, $parent)
    {
        $lines = collect($data)->map(fn($datum) => [
            'id' => $datum['id'] ?? null,
            'city_id' => $datum['city_id'],
            'fee' => $datum['fee'],
            'delivery_fee_id' => $parent->id,
        ])->toArray();
        $query->upsert($lines, ['id']);
        return $query;
    }
}

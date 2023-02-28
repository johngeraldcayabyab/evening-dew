<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class DeliveryFee extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'delivery_fees';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'fee' => 'double',
    ];

    public function deliveryFeeLines()
    {
        return $this->hasMany(DeliveryFeeLine::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function slug()
    {
        return 'name';
    }
}

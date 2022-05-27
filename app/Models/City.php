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

class City extends Model implements Sluggable
{
    use HasFactory;

    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'cities';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function slug()
    {
        return 'name';
    }

    public function deliveryFeeLines()
    {
        return $this->hasMany(DeliveryFeeLine::class);
    }
}

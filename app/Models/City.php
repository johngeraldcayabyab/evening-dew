<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
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

    public function nextRecord()
    {
        return City::select('id')->where('id', '>', $this->id)->orderBy('id', 'asc')->first()->id;
    }

    public function previousRecord()
    {
        return City::select('id')->where('id', '<', $this->id)->orderBy('id', 'desc')->first()->id;
    }

    public function deliveryFeeLines()
    {
        return $this->hasMany(DeliveryFeeLine::class);
    }
}

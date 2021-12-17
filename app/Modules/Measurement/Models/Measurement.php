<?php

namespace App\Modules\Measurement\Models;

use App\Modules\MeasurementCategory\Models\MeasurementCategory;
use Illuminate\Broadcasting\Channel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Measurement extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;

    const BIGGER = 'bigger';
    const SMALLER = 'smaller';
    const REFERENCE = 'reference';

    protected $table = 'measurements';
    protected $guarded = [];

    public function measurementCategory()
    {
        return $this->belongsTo(MeasurementCategory::class);
    }

    public static function getTypes()
    {
        return [self::BIGGER, self::SMALLER, self::REFERENCE];
    }

    public function broadcastOn($event)
    {
        return new Channel('measurement');
    }

    public function scopeName($query, $name)
    {
        return $query->where('like', "%$name%");
    }

    public function scopeType($query, $type)
    {
        return $query->where('like', "%$type%");
    }

    public function scopeRatio($query, $ratio)
    {
        return $query->where('like', "%$ratio%");
    }

    public function scopeRoundingPrecision($query, $roundingPrecision)
    {
        return $query->where('like', "%$roundingPrecision");
    }

    public function scopeMeasurementCategory($query)
    {

    }
}

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

class Measurement extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const BIGGER = 'bigger';
    const SMALLER = 'smaller';
    const REFERENCE = 'reference';

    const DEFAULT_RATIO = 1;
    const DEFAULT_ROUNDING_PRECISION = 0.01;

    protected $table = 'measurements';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getTypes()
    {
        return [self::BIGGER, self::SMALLER, self::REFERENCE];
    }

    public function measurementCategory()
    {
        return $this->belongsTo(MeasurementCategory::class);
    }

    public function slug()
    {
        return 'name';
    }
}

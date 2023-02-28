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

class Currency extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const BEFORE_AMOUNT = 'before_amount';
    const AFTER_AMOUNT = 'after_amount';

    protected $table = 'currencies';
    protected $guarded = [];
    protected static $logAttributes = ['*'];
    protected $casts = [
        'rounding_factor' => 'double',
    ];

    public static function getSymbolPositions()
    {
        return [self::BEFORE_AMOUNT, self::AFTER_AMOUNT];
    }

    public function country()
    {
        return $this->hasMany(Country::class);
    }

    public function slug()
    {
        return 'currency';
    }
}

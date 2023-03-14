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

class Payment extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const AT_CONFIRMATION = 'at_confirmation';
    const MANUALLY = 'manually';
    const BEFORE_SCHEDULED_DATE = 'before_scheduled_date';

    const RECEIPT = 'receipt';
    const DELIVERY = 'delivery';
    const INTERNAL = 'internal';
    const MANUFACTURING = 'manufacturing';
    const ADJUSTMENT = 'adjustment';

    protected $table = 'operations_types';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getReservationMethods()
    {
        return [self::AT_CONFIRMATION, self::MANUALLY, self::BEFORE_SCHEDULED_DATE];
    }

    public static function getTypes()
    {
        return [self::RECEIPT, self::DELIVERY, self::INTERNAL, self::MANUFACTURING, self::ADJUSTMENT];
    }


    public function slug()
    {
        return 'number';
    }
}

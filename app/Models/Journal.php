<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\HierarchyTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Journal extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use HierarchyTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const SALES = 'sales';
    const PURCHASE = 'purchase';
    const CASH = 'cash';
    const BANK = 'bank';
    const MISCELLANEOUS = 'miscellaneous';

    protected $table = 'journals';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getTypes()
    {
        return [self::SALES, self::PURCHASE, self::CASH, self::BANK, self::MISCELLANEOUS];
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function slug()
    {
        return 'name';
    }
}


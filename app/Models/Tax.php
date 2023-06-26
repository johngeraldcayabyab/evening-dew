<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tax extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const SALES = 'sales';
    const PURCHASES = 'purchases';
    const NONE = 'none';

    const GOODS = 'goods';
    const SERVICES = 'services';

    const FIXED = 'fixed';
    const PERCENTAGE_OF_PRICE = 'percentage_of_price';

    protected $table = 'taxes';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getTypes()
    {
        return [self::SALES, self::PURCHASES, self::NONE];
    }

    public static function getScopes()
    {
        return [self::GOODS, self::SERVICES, self::NONE];
    }

    public static function getComputations()
    {
        return [self::FIXED, self::PERCENTAGE_OF_PRICE];
    }

    public function chartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class);
    }

    public function slug()
    {
        return 'name';
    }
}

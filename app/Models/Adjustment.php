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

class Adjustment extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'adjustments';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    const DRAFT = 'draft';
    const DONE = 'done';
    const CANCELLED = 'cancelled';

    public static function getStatuses()
    {
        return [self::DRAFT, self::DONE, self::CANCELLED];
    }

    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function adjustmentLines()
    {
        return $this->hasMany(AdjustmentLine::class);
    }

    public function slug()
    {
        return 'number';
    }
}

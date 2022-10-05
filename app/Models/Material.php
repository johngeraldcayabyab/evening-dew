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

class Material extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const MANUFACTURE_THIS_PRODUCT = 'manufacture_this_product';
    const KIT = 'kit';

    const ALLOWED = 'allowed';
    const ALLOWED_WITH_WARNING = 'allowed_with_warning';
    const BLOCKED = 'blocked';

    protected $table = 'materials';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getMaterialTypes()
    {
        return [self::MANUFACTURE_THIS_PRODUCT, self::KIT];
    }

    public static function getFlexibleConsumptions()
    {
        return [self::ALLOWED, self::ALLOWED_WITH_WARNING, self::BLOCKED];
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function materialLines()
    {
        return $this->hasMany(MaterialLine::class);
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function slug()
    {
        return 'reference';
    }
}

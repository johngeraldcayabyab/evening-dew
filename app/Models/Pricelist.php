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


class Pricelist extends Model implements Sluggable
{

    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;


    protected $table = 'pricelists';
    protected $fillable = ['name'];

    protected static $logAttributes = ['*'];
    public function products()
    {
        return $this->hasMany(PricelistProduct::class);
    }

    public function slug()
    {
        return 'name';
    }
}

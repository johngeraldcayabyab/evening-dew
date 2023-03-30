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

class Country extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'countries';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', true)->first();
    }

    public function slug()
    {
        return 'country_name';
    }
}

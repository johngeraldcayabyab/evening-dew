<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Database\Factories\JobFactory;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\Activitylog\Traits\LogsActivity;

class Job extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;
    use LogsActivity;

    protected static function newFactory()
    {
        return JobFactory::new();
    }

    public function scopeFilter($query, $filter)
    {
        if ($filter[0] === 'whereJob') {
            return $query->where('job', 'like', "%$filter[1]%");
        } elseif ($filter[0] === 'orderJob') {
            return $query->orderBy('job', "$filter[1]");
        }
        return $query;
    }

    public function slug()
    {
        return 'job';
    }
}

<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Database\Factories\JobFactory;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
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

    public function scopeWhereJob($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeOrderByJob($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'job';
    }
}

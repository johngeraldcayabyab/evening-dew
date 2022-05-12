<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Region extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;

    protected $table = 'regions';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function slug()
    {
        return 'region';
    }
}

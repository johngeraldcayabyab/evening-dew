<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class UserGroupLine extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'user_group_lines';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function slug()
    {
        return 'name';
    }

    public function scopeMassUpsert($query, $data, $parent)
    {
        $lines = collect($data)->map(function ($datum) use ($parent) {
            return [
                'id' => $datum['id'] ?? null,
                'group_id' => $datum['group_id'],
                'user_id' => $parent->id,
            ];
        });
        $query->upsert($lines, ['id']);
        return $query;
    }
}

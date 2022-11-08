<?php

namespace App\Models;

use App\Traits\FilterTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Spatie\Activitylog\Models\Activity;

class ActivityLog extends Activity
{
    use FilterTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'activity_log';
}

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

class SalesSetting extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'sales_settings';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function referenceSequence()
    {
        return $this->belongsTo(Sequence::class, 'reference_sequence_id', 'id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function slug()
    {
        return 'name';
    }
}

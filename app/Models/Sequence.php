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

class Sequence extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'sequences';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    const NO_GAP = 'no_gap';
    const STANDARD = 'standard';

    const SEQUENCE_SIZE = 6;
    const STEP = 1;
    const NEXT_NUMBER = 0;

    public static function getImplementations()
    {
        return [self::NO_GAP, self::STANDARD];
    }

    public function scopeGenerateSequence($query, $id)
    {
        $generatedSequence = "";
        $sequence = $query->find($id);
        if ($sequence->prefix) {
            $generatedSequence .= $sequence->prefix;
        }
        $newNum = $sequence->next_number + $sequence->step;
        $generatedSequence .= sprintf("%0{$sequence->sequence_size}d", $newNum);
        if ($sequence->suffix) {
            $generatedSequence .= $sequence->suffix;
        }
        return $generatedSequence;
    }

    public function slug()
    {
        return 'name';
    }
}

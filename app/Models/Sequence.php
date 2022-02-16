<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sequence extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'sequences';
    protected $guarded = [];

    const NO_GAP = 'no_gap';
    const STANDARD = 'standard';

    public function getSearchableAndSortableFields()
    {
        return [
            'name',
            'sequence_code',
            'implementation',
            'prefix',
            'suffix',
            'sequence_size',
            'step',
            'next_number',
        ];
    }

    public static function getImplementations()
    {
        return [self::NO_GAP, self::STANDARD];
    }

    public function scopeWhereName($query, $name)
    {
        return $query->where('name', 'like', "%$name%");
    }

    public function scopeWhereSequenceCode($query, $sequenceCode)
    {
        return $query->where('sequence_code', 'like', "%$sequenceCode%");
    }

    public function scopeWhereImplementation($query, $sequenceCode)
    {
        return $query->where('implementation', 'like', "%$sequenceCode%");
    }

    public function scopeWherePrefix($query, $prefix)
    {
        return $query->where('prefix', 'like', "%$prefix%");
    }

    public function scopeWhereSuffix($query, $suffix)
    {
        return $query->where('suffix', 'like', "%$suffix%");
    }

    public function scopeWhereSequenceSize($query, $sequenceSize)
    {
        return $query->where('sequence_size', 'like', "%$sequenceSize%");
    }

    public function scopeWhereStep($query, $step)
    {
        return $query->where('step', 'like', "%$step%");
    }

    public function scopeNextNumber($query, $nextNumber)
    {
        return $query->where('next_number', 'like', "%$nextNumber%");
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }

    public function scopeOrderBySequenceCode($query, $order)
    {
        return $query->orderBy('sequence_code', $order);
    }

    public function scopeOrderByImplementation($query, $order)
    {
        return $query->orderBy('implementation', $order);
    }

    public function scopeOrderByPrefix($query, $order)
    {
        return $query->orderBy('prefix', $order);
    }

    public function scopeOrderBySuffix($query, $order)
    {
        return $query->orderBy('suffix', $order);
    }

    public function scopeOrderBySequenceSize($query, $order)
    {
        return $query->orderBy('sequence_size', $order);
    }

    public function scopeOrderByStep($query, $order)
    {
        return $query->orderBy('step', $order);
    }

    public function scopeOrderByNextNumber($query, $order)
    {
        return $query->orderBy('next_number', $order);
    }

    public function scopeGenerateSalesOrderSequence()
    {
        $salesOrderDefaultSequence = GlobalSetting::latestFirst()->salesOrderDefaultSequence;
        $generatedSequence = "";
        if ($salesOrderDefaultSequence) {
            $sequence = Sequence::find($salesOrderDefaultSequence->id);
            if ($sequence->prefix) {
                $generatedSequence .= $sequence->prefix;
            }
            $newNum = $sequence->next_number + $sequence->step;
            $generatedSequence .= sprintf("%0{$sequence->sequence_size}d", $newNum);
            if ($sequence->suffix) {
                $generatedSequence .= $sequence->suffix;
            }
        }
        return $generatedSequence;
    }

    public function scopeSalesOrderSequence()
    {
        return GlobalSetting::latestFirst()->salesOrderDefaultSequence;
    }
}

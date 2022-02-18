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

    public function scopeWhereName($query, $where)
    {
        return $query->where('name', 'like', "%$where%");
    }

    public function scopeWhereSequenceCode($query, $where)
    {
        return $query->where('sequence_code', 'like', "%$where%");
    }

    public function scopeWhereImplementation($query, $where)
    {
        return $query->where('implementation', 'like', "%$where%");
    }

    public function scopeWherePrefix($query, $where)
    {
        return $query->where('prefix', 'like', "%$where%");
    }

    public function scopeWhereSuffix($query, $where)
    {
        return $query->where('suffix', 'like', "%$where%");
    }

    public function scopeWhereSequenceSize($query, $where)
    {
        return $query->where('sequence_size', 'like', "%$where%");
    }

    public function scopeWhereStep($query, $where)
    {
        return $query->where('step', 'like', "%$where%");
    }

    public function scopeNextNumber($query, $where)
    {
        return $query->where('next_number', 'like', "%$where%");
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
}

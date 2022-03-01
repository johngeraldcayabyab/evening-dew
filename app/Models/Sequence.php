<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sequence extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'sequences';
    protected $guarded = [];

    const NO_GAP = 'no_gap';
    const STANDARD = 'standard';

    public static function getImplementations()
    {
        return [self::NO_GAP, self::STANDARD];
    }

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSequenceCode($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereImplementation($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWherePrefix($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSuffix($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereSequenceSize($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereStep($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeNextNumber($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySequenceCode($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByImplementation($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByPrefix($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySuffix($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderBySequenceSize($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByStep($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByNextNumber($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
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

    public function slug()
    {
        return 'name';
    }
}

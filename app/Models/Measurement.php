<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Broadcasting\Channel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Measurement extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    const BIGGER = 'bigger';
    const SMALLER = 'smaller';
    const REFERENCE = 'reference';

    protected $table = 'measurements';
    protected $guarded = [];

    public static function getTypes()
    {
        return [self::BIGGER, self::SMALLER, self::REFERENCE];
    }

    public function broadcastOn($event)
    {
        return new Channel('measurement');
    }

    public function measurementCategory()
    {
        return $this->belongsTo(MeasurementCategory::class);
    }

    public function scopeWhereName($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereType($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereRatio($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereRoundingPrecision($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereMeasurementCategory($query, $where)
    {
        return $this->likeHas($query, 'measurementCategory', 'name', $where);
    }

    public function scopeWhereMeasurementCategoryId($query, $where)
    {
        return $this->whereId($query, __FUNCTION__, $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByType($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByRatio($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByRoundingPrecision($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMeasurementCategory($query, $order)
    {
        return $this->orderHas($query, new MeasurementCategory(), 'name', "measurement_category_id", $order);
    }

    public function scopeOrderByMeasurementCategoryId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }
}

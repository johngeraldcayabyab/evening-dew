<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Illuminate\Broadcasting\Channel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Measurement extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;
    use LogsActivity;

    const BIGGER = 'bigger';
    const SMALLER = 'smaller';
    const REFERENCE = 'reference';

    protected $table = 'measurements';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getTypes()
    {
        return [self::BIGGER, self::SMALLER, self::REFERENCE];
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

    public function scopeWhereMeasurementCategoryId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
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

    public function scopeOrderByMeasurementCategoryId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereMeasurementCategory($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeOrderByMeasurementCategory($query, $order)
    {
        return $this->orderHas($query, new MeasurementCategory(), 'name', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'name';
    }
}

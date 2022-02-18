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

    public function getSearchableAndSortableFields()
    {
        return [
            'name',
            'type',
            'ratio',
            'rounding_precision',
            'measurement_category',
            'measurement_category_id'
        ];
    }

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
        return $query->where('name', 'like', "%$where%");
    }

    public function scopeWhereType($query, $where)
    {
        return $query->where('type', 'like', "%$where%");
    }

    public function scopeWhereRatio($query, $where)
    {
        return $query->where('ratio', 'like', "%$where%");
    }

    public function scopeWhereRoundingPrecision($query, $where)
    {
        return $query->where('rounding_precision', 'like', "%$where");
    }

    public function scopeWhereMeasurementCategory($query, $where)
    {
        return $query->whereHas('measurementCategory', function ($query) use ($where) {
            return $query->where('name', 'like', "%$where%");
        });
    }

    public function scopeWhereMeasurementCategoryId($query, $where)
    {
        return $query->where('measurement_category_id', $where);
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }

    public function scopeOrderByType($query, $order)
    {
        return $query->orderBy('type', $order);
    }

    public function scopeOrderByRatio($query, $order)
    {
        return $query->orderBy('ratio', $order);
    }

    public function scopeOrderByRoundingPrecision($query, $order)
    {
        return $query->orderBy('rounding_precision', $order);
    }

    public function scopeOrderByMeasurementCategory($query, $order)
    {
        return $query->orderBy(MeasurementCategory::select('name')->whereColumn('measurement_categories.id', 'measurements.measurement_category_id'), $order);
    }

    public function scopeOrderByMeasurementCategoryId($query, $order)
    {
        return $query->orderBy('measurement_category_id', $order);
    }
}

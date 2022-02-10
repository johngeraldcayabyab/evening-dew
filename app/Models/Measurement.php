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

    public function getSearchableFields()
    {
        return [
            'name',
            'type',
            'ratio',
            'rounding_precision',
            'measurement_category',
        ];
    }

    public function getSortableFields()
    {
        return [
            'name',
            'type',
            'ratio',
            'rounding_precision',
            'measurement_category',
            'created_at',
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

    public function scopeWhereName($query, $name)
    {
        return $query->where('name', 'like', "%$name%");
    }

    public function scopeWhereType($query, $type)
    {
        return $query->where('type', 'like', "%$type%");
    }

    public function scopeWhereRatio($query, $ratio)
    {
        return $query->where('ratio', 'like', "%$ratio%");
    }

    public function scopeWhereRoundingPrecision($query, $roundingPrecision)
    {
        return $query->where('rounding_precision', 'like', "%$roundingPrecision");
    }

    public function scopeWhereMeasurementCategory($query, $measurementCategory)
    {
        return $query->whereHas('measurementCategory', function ($query) use ($measurementCategory) {
            return $query->where('name', 'like', "%$measurementCategory%");
        });
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
}

<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Database\Factories\MeasurementCategoryFactory;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MeasurementCategory extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'measurement_categories';
    protected $guarded = [];

    public function getSearchableAndSortableFields()
    {
        return [
            'name',
        ];
    }

    protected static function newFactory()
    {
        return MeasurementCategoryFactory::new();
    }

    public function measurements()
    {
        return $this->hasMany(Measurement::class);
    }

    public function scopeWhereName($query, $where)
    {
        return $query->where('name', 'like', "%$where%");
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }
}

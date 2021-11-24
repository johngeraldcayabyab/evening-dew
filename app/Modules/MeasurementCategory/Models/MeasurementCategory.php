<?php

namespace App\Modules\MeasurementCategory\Models;

use App\Modules\Measurement\Models\Measurement;
use App\Modules\MeasurementCategory\Factories\MeasurementCategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MeasurementCategory extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'measurement_categories';
    protected $guarded = [];

    protected static function newFactory()
    {
        return MeasurementCategoryFactory::new();
    }

    public function measurements()
    {
        return $this->hasMany(Measurement::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MeasurementCategory extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'measurement_categories';
    protected $guarded = [];

    public function measurements()
    {
        return $this->hasMany(Measurement::class);
    }
}

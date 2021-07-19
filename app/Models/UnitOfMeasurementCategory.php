<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnitOfMeasurementCategory extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'unit_of_measurement_category';
}

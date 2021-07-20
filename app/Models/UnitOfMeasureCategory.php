<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnitOfMeasureCategory extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'units_of_measure_categories';
}

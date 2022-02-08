<?php

namespace App\Models;

use App\Traits\TimeStampOrderTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GlobalSetting extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use TimeStampOrderTrait;

    protected $table = 'global_settings';
    protected $guarded = [];

    public function inventoryDefaultMeasurement()
    {
        return $this->hasOne(Measurement::class, 'inventory_default_measurement_id', 'id');
    }
}

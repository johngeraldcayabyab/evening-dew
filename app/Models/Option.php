<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Option extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'options';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function slug()
    {
        return 'name';
    }

    public static function getComputationSettings($module)
    {
        $formattedData = Option::whereIn('name', [
            "{$module}_computation_order",
            "{$module}_tax_computation_order",
            "{$module}_discount_computation_order"
        ])->get()->pluck('value', 'name')->toArray();

        $prefix = "{$module}_";
        return collect($formattedData)->mapWithKeys(function ($value, $key) use ($prefix) {
            return [str_replace($prefix, '', $key) => $value];
        })->toArray();
    }
}

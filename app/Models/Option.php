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

    public static function getSalesOrderComputationSettings()
    {
        $formattedData = Option::whereIn('name', [
            'sales_order_computation_order',
            'sales_order_tax_computation_order',
            'sales_order_discount_computation_order'
        ])->get()->pluck('value', 'name')->toArray();
        return collect($formattedData)->map(function ($value) {
            return $value === 'unit_price' ? 'unit' : $value;
        })->toArray();
    }
}

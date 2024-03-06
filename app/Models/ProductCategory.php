<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\HierarchyTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use HierarchyTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    const STANDARD_PRICE = 'standard_price';
    const AVERAGE_COST = 'average_cost';
    const FIRST_IN_FIRST_OUT = 'first_in_first_out';

    protected $table = 'product_categories';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public static function getCostingMethods()
    {
        return [self::STANDARD_PRICE, self::AVERAGE_COST, self::FIRST_IN_FIRST_OUT];
    }

    public function parentProductCategory()
    {
        return $this->belongsTo(ProductCategory::class, 'parent_product_category_id', 'id');
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', true)->first();
    }

    public function slug()
    {
        return 'parent.category';
    }
}

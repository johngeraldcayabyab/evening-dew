<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Adjustment extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;
    use LogsActivity;

    protected $table = 'adjustments';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function adjustmentLines()
    {
        return $this->hasMany(AdjustmentLine::class);
    }

    public function scopeWhereNumber($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereProductCategoryId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeOrderByNumber($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByProductCategoryId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereProductCategory($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'category', $where);
    }

    public function scopeOrderByProductCategory($query, $order)
    {
        return $this->orderHas($query, new ProductCategory(), 'category', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'number';
    }
}

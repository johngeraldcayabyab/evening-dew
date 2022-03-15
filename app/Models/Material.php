<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Material extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    const MANUFACTURE_THIS_PRODUCT = 'manufacture_this_product';
    const KIT = 'kit';

    protected $table = 'materials';
    protected $guarded = [];

    public static function getMaterialTypes()
    {
        return [self::MANUFACTURE_THIS_PRODUCT, self::KIT];
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function materialLines()
    {
        return $this->hasMany(MaterialLine::class);
    }

    public function scopeWhereProductId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereQuantity($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereMeasurementId($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereReference($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereMaterialType($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeOrderByProductId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByQuantity($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMeasurementId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByReference($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMaterialType($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereProduct($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'name', $where);
    }

    public function scopeOrderByProduct($query, $order)
    {
        return $this->orderHas($query, new Product(), 'name', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'reference';
    }
}

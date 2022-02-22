<?php

namespace App\Models;

use App\Traits\HierarchyTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    use HierarchyTrait;

    protected $table = 'product_categories';
    protected $guarded = [];

    public function getSearchableAndSortableFields()
    {
        return [
            'category',
            'parent_product_category_id'
        ];
    }

    public function scopeWhereCategory($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereParentProductCategoryId($query, $where)
    {
        return $this->whereId($query, __FUNCTION__, $where);
    }

    public function scopeOrderByCategory($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByParentProductCategoryId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }
}

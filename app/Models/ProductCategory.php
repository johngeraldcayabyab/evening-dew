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
            'with_parents',
        ];
    }

    public function getWithParentsAttribute()
    {
        return $this->getWithParents('category');
    }

    public function scopeWhereCategory($query, $where)
    {
        return $this->like($query, 'category', $where);
    }

    public function scopeOrderByCategory($query, $order)
    {
        return $query->orderBy('category', $order);
    }

    public function scopeOrderByWithParents($query, $order)
    {
        return $query->orderBy('category', $order);
    }

    public function scopeWhereWithParents($query, $where)
    {
        return $this->like($query, 'category', $where);
    }
}

<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'menus';
    protected $guarded = [];

    public function getSearchableAndSortableFields()
    {
        return [
            'label',
            'url',
            'parent_id'
        ];
    }

    public function scopeWhereLabel($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereUrl($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereParentId($query, $where)
    {
        return $query->where('parent_id', $where);
    }

    public function scopeOrderByLabel($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByUrl($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByParentId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }
}

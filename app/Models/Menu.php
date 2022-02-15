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

    public function scopeWhereLabel($query, $label)
    {
        return $query->where('label', 'like', "%$label%");
    }

    public function scopeWhereUrl($query, $url)
    {
        return $query->where('url', 'like', "%$url%");
    }

    public function scopeWhereParentId($query, $parentId)
    {
        return $query->where('parent_id', "%$parentId%");
    }

    public function scopeOrderByLabel($query, $order)
    {
        return $query->orderBy('label', $order);
    }

    public function scopeOrderByUrl($query, $order)
    {
        return $query->orderBy('url', $order);
    }

    public function scopeOrderByParentId($query, $order)
    {
        return $query->orderBy('parent_id', $order);
    }
}

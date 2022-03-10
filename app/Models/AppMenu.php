<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\HierarchyTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AppMenu extends Model implements Sluggable
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;
    use HierarchyTrait;

    protected $table = 'app_menus';
    protected $guarded = [];

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

    public function parentAppMenu()
    {
        return $this->belongsTo(AppMenu::class, 'parent_app_menu_id', 'id');
    }

    public function scopeWhereLabel($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereIsView($query, $where)
    {
        return $this->like($query, __FUNCTION__, $where);
    }

    public function scopeWhereMenuId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeWhereParentAppMenuId($query, $where)
    {
        return $this->whereSingle($query, __FUNCTION__, $where);
    }

    public function scopeOrderByLabel($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByIsView($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByMenuId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeOrderByParentAppMenuId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereMenu($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'label', $where);
    }

    public function scopeWhereParentAppMenu($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'label', $where);
    }

    public function scopeOrderByMenu($query, $order)
    {
        return $this->orderHas($query, new Menu(), 'label', __FUNCTION__, $order);
    }

    public function scopeOrderByParentAppMenu($query, $order)
    {
        return $this->orderHas($query, new AppMenu(), 'label', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'label';
    }
}

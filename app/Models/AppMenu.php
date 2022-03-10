<?php

namespace App\Models;

use App\Contacts\Sluggable;
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

    protected $table = 'app_menus';
    protected $guarded = [];

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

    public function parentMenu()
    {
        return $this->belongsTo(AppMenu::class, 'parent_menu_id');
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

    public function scopeWhereParentMenuId($query, $where)
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

    public function scopeOrderByParentMenuId($query, $order)
    {
        return $this->order($query, __FUNCTION__, $order);
    }

    public function scopeWhereMenu($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'label', $where);
    }

    public function scopeWhereParentMenu($query, $where)
    {
        return $this->likeHas($query, __FUNCTION__, 'label', $where);
    }

    public function scopeOrderByMenu($query, $order)
    {
        return $this->orderHas($query, new Menu(), 'label', __FUNCTION__, $order);
    }

    public function scopeOrderByParentMenu($query, $order)
    {
        return $this->orderHas($query, new AppMenu(), 'label', __FUNCTION__, $order);
    }

    public function slug()
    {
        return 'label';
    }
}

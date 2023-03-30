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

class AppMenu extends Model implements Sluggable
{
    use AutoLogTrait;
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use HierarchyTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'app_menus';
    protected $guarded = [];
    protected static $logAttributes = ['*'];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

    public function parentAppMenu()
    {
        return $this->belongsTo(AppMenu::class, 'parent_app_menu_id', 'id');
    }

    public function slug()
    {
        return 'parent.label';
    }
}

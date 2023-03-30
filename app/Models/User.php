<?php

namespace App\Models;

use App\Contracts\Sluggable;
use App\Traits\AutoLogTrait;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use App\Traits\NextAndPreviousRecordTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements Sluggable
{
    use AutoLogTrait;
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use ModelHelperTrait;
    use NextAndPreviousRecordTrait;

    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'password',
        'app_menu_id',
        'avatar',
        'general_clickable_row'
    ];
    protected static $logAttributes = ['*'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function appMenu()
    {
        return $this->belongsTo(AppMenu::class);
    }

    public function userGroupLines()
    {
        return $this->hasMany(UserGroupLine::class);
    }

    public function slug()
    {
        return 'name';
    }
}

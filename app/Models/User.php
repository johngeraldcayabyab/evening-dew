<?php

namespace App\Models;

use App\Contacts\Sluggable;
use App\Traits\FilterTrait;
use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable implements Sluggable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;
    use BroadcastsEvents;
    use FilterTrait;
    use LogsActivity;
    use ModelHelperTrait;

    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar'
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

    public function slug()
    {
        return 'name';
    }
}

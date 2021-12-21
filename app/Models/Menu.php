<?php

namespace App\Models;

use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;

    protected $table = 'menus';
    protected $guarded = [];

    public function scopeLabel($query)
    {

    }

    public function scopeUrl($query)
    {

    }
}

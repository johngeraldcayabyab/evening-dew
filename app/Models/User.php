<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function scopeWhereName($query, $name)
    {
        return $query->where('name', 'like', "%$name%");
    }

    public function scopeWhereEmail($query, $email)
    {
        return $query->where('email', 'like', "%$email%");
    }

    public function scopeOrderByName($query, $order)
    {
        return $query->orderBy('name', $order);
    }

    public function scopeOrderByEmail($query, $order)
    {
        return $query->orderBy('email', $order);
    }

    public function scopeOrderByEmailVerifiedAt($query, $order)
    {
        return $query->orderBy('email_verified_at', $order);
    }
}

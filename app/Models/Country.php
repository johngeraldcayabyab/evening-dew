<?php

namespace App\Models;

use App\Traits\ModelHelperTrait;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;
    use ModelHelperTrait;

    protected $table = 'countries';
    protected $guarded = [];

    public function scopeWhereCountryName($query, $countryName)
    {
        return $query->where('country_name', 'like', "%$countryName%");
    }

    public function scopeOrderByCountryName($query, $order)
    {
        return $query->orderBy('country_name', $order);
    }
}

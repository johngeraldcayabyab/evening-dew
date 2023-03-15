<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Pricelist extends Model
{

    protected $table = 'pricelists';
    protected $fillable = ['name'];
    public function products()
    {
        return $this->hasMany(PricelistProduct::class);
    }

}

<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Pricelist extends Model
{

    protected $table = 'pricelists';

    public function pricelistProducts()
    {
        return $this->hasMany(PricelistProduct::class);
    }

}

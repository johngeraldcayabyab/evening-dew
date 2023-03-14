<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricelistProduct extends Model
{
    protected $table = 'pricelists_products';

    public function pricelistProduct()
    {
        return $this->belongsTo(Pricelist::class);
    }

}

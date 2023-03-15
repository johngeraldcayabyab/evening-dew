<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricelistProduct extends Model
{
    protected $table = 'pricelists_products';
    protected $fillable = ['product_id','unit_price'];


    public function pricelist()
    {
        return $this->belongsTo(Pricelist::class);
    }

}

<?php

namespace App\Listeners;

use App\Events\ProductDeleted;
use App\Models\PricelistProduct;
use Illuminate\Support\Facades\Log;

class ProductSubscriber
{

    /*
     * TODO - Redesign if pricelist is large
     * */
    public function handle(ProductDeleted $event): void
    {

        Log::debug('Deleting product from pricelist '.$event->product->id);
        PricelistProduct::where('product_id', $event->product->id)->delete();
    }

}

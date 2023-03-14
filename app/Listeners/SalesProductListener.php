<?php

namespace App\Listeners;

use App\Events\ProductCreated;
use App\Models\SalesProduct;


class SalesProductListener
{

    public function handle(ProductCreated $event)
    {

        /*
         * TODO - convert to SalesProduct::create
         * */
        $salesProduct = new SalesProduct($event->getProduct());
        $salesProduct->save();
    }
}

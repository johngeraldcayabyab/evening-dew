<?php

namespace App\Listeners\Sales;

use App\Events\ProductCreated;
use App\Models\Sales\Product;


class ProductListener
{



    public function handle(ProductCreated $event)
    {
        $salesProduct = new Product($event->getProduct());
        $salesProduct->save();
    }
}

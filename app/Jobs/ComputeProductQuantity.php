<?php

namespace App\Jobs;

use App\Events\ComputeProductQuantityEvent;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ComputeProductQuantity implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $product = new Product();
        $products = $product->where('product_type', Product::STORABLE)->get();
        foreach ($products as $product) {
            ComputeProductQuantityEvent::dispatch($product);
        }
    }
}

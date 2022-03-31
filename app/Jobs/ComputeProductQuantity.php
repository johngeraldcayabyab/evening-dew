<?php

namespace App\Jobs;

use App\Models\Product;
use App\Models\StockMovement;
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
        $productIds = $product->get(['id'])->pluck('id');
        info($productIds);
    }
}

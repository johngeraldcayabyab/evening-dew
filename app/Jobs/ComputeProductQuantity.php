<?php

namespace App\Jobs;

use App\Models\Location;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ComputeProductQuantity implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public array $productIds;

    public function __construct(array $productIds)
    {
        $this->productIds = $productIds;
    }

    public function handle()
    {
        $internalLocationIds = Location::where('type', Location::INTERNAL)->pluck('id');
        Product::find($this->productIds)->each(function ($product) use ($internalLocationIds) {
            $internalLocationQuantity = collect($internalLocationIds)->reduce(function (int $quantity, $internalLocationId) use ($product) {
                $stockMovementSourceLocationSum = StockMovement::where('product_id', $product->id)
                    ->where('source_location_id', $internalLocationId)
                    ->pluck('quantity_done')
                    ->sum();
                $stockMovementDestinationLocationSum = StockMovement::where('product_id', $product->id)
                    ->where('destination_location_id', $internalLocationId)
                    ->pluck('quantity_done')
                    ->sum();
                $quantity += $stockMovementDestinationLocationSum - $stockMovementSourceLocationSum;
                return $quantity;
            }, 0);
            $product->quantity = $internalLocationQuantity;
            $product->save();
        });
    }
}

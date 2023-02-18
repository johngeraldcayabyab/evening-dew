<?php

namespace App\Jobs;

use App\Models\Location;
use App\Models\Product;
use App\Models\StockMovement;
use App\Services\LocationCompute\CustomerCompute;
use App\Services\LocationCompute\InternalCompute;
use App\Services\LocationCompute\InventoryLossCompute;
use App\Services\LocationCompute\VendorCompute;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ComputeAllProductQuantityJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $product = new Product();
        $products = $product->where('product_type', Product::STORABLE)->get();
        foreach ($products as $product) {
            $this->construct($product);
        }
    }

    public function construct(Product $product)
    {
        $currentQuantity = $product->quantity;
        $stockMovements = StockMovement::where('product_id', $product->id)->get();
        $initialQuantity = 0;
        foreach ($stockMovements as $stockMovement) {
            $sourceLocation = $stockMovement->sourceLocation;
            if (Location::isCustomer($sourceLocation)) {
                $customerCompute = new CustomerCompute($stockMovement);
                $initialQuantity = $customerCompute->handle($initialQuantity);
            }
            if (Location::isInternal($sourceLocation)) {
                $internalCompute = new InternalCompute($stockMovement);
                $initialQuantity = $internalCompute->handle($initialQuantity);
            }
            if (Location::isInventoryLoss($sourceLocation)) {
                $inventoryLossCompute = new InventoryLossCompute($stockMovement);
                $initialQuantity = $inventoryLossCompute->handle($initialQuantity);
            }
            if (Location::isVendor($sourceLocation)) {
                $vendorCompute = new VendorCompute($stockMovement);
                $initialQuantity = $vendorCompute->handle($initialQuantity);
            }
        }
        if ($currentQuantity !== $initialQuantity) {
            $product->quantity = $initialQuantity;
            $product->save();
        }
    }
}

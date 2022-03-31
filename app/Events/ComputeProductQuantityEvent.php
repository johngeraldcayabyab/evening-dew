<?php

namespace App\Events;

use App\Models\Location;
use App\Models\Product;
use App\Models\StockMovement;
use App\Services\LocationCompute\CustomerCompute;
use App\Services\LocationCompute\InternalCompute;
use App\Services\LocationCompute\InventoryLossCompute;
use App\Services\LocationCompute\VendorCompute;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ComputeProductQuantityEvent implements ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(Product $product)
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

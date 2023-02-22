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

class ComputeProductQuantity implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $productIds;

    public function __construct(array $productIds)
    {
        $this->productIds = $productIds;
    }

    public function handle()
    {
        Product::find($this->productIds)->each(function ($product) {
            $currentQuantity = $product->quantity;
            $stockMovements = StockMovement::where('product_id', $product->id)->get();
            $doneQuantity = $stockMovements->reduce(function (int $carry, StockMovement $stockMovement) {
                $sourceLocation = $stockMovement->sourceLocation;
                if (Location::isCustomer($sourceLocation)) {
                    $customerCompute = new CustomerCompute($stockMovement);
                    $carry = $customerCompute->handle($carry);
                }
                if (Location::isInternal($sourceLocation)) {
                    $internalCompute = new InternalCompute($stockMovement);
                    $carry = $internalCompute->handle($carry);
                }
                if (Location::isInventoryLoss($sourceLocation)) {
                    $inventoryLossCompute = new InventoryLossCompute($stockMovement);
                    $carry = $inventoryLossCompute->handle($carry);
                }
                if (Location::isVendor($sourceLocation)) {
                    $vendorCompute = new VendorCompute($stockMovement);
                    $carry = $vendorCompute->handle($carry);
                }
                return $carry;
            }, 0);
            if ($currentQuantity !== $doneQuantity) {
                $product->quantity = $doneQuantity;
                $product->save();
            }
        });
    }
}

<?php

namespace App\Listeners;

use App\Events\ProductHasMaterialEvent;
use App\Models\OperationType;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementForMaterialLinesListener implements ShouldQueue
{
    public function handle(ProductHasMaterialEvent $event)
    {
        $transfer = $event->transfer;
        $transferLine = $event->transferLine;
        $operationType = $event->operationType;
        $material = $event->transferLine->product->material;
        $materialLines = $material->materialLines;
        $stockMovementData = [];
        foreach ($materialLines as $materialLine) {
            $materialLineProduct = $materialLine->product;
            if ($materialLineProduct->product_type === Product::STORABLE) {
                $stockMovementData[] = [
                    'reference' => $transfer->reference,
                    'source' => $transfer->reference,
                    'product_id' => $materialLine->product_id,
                    'source_location_id' => $transfer->source_location_id,
                    'destination_location_id' => $transfer->destination_location_id,
                    'quantity_done' => $materialLine->quantity * $transferLine->demand,
                ];
                $this->computeProductQuantityNew($materialLine->product, $operationType, $materialLine->quantity, $transferLine->demand);
            }
            if ($materialLineProduct->material()->exists()) {
//                ProductHasMaterialEvent::dispatch($transfer, $transferLine, $operationType);
            }
        }
        if (count($stockMovementData)) {
            StockMovement::insertMany($stockMovementData);
        }
    }

    private function computeProductQuantityNew($product, $operationType, $materialQuantity, $demand)
    {
        if ($operationType->type === OperationType::DELIVERY) {
            $product->quantity = $product->quantity - ($materialQuantity * $demand);
        } else if ($operationType->type === OperationType::RECEIPT) {
            $product->quantity = $product->quantity + ($materialQuantity * $demand);
        }
        $product->save();
    }
}

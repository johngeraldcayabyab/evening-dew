<?php

namespace App\Listeners;

use App\Events\AdjustmentValidatedEvent;
use App\Events\ProductHasMaterialEvent;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateTransferFromValidatedAdjustment implements ShouldQueue
{
    public function handle(AdjustmentValidatedEvent $event)
    {
        $adjustment = $event->adjustment;
        $adjustmentLines = $adjustment->adjustmentLines;
        $stockMovementData = [];
        foreach ($adjustmentLines as $adjustmentLine) {
            $product = $adjustmentLine->product;
            if ($product->product_type === Product::STORABLE) {
                $stockMovementData[] = [
                    'reference' => $adjustment->reference,
                    'source' => $adjustment->reference,
                    'product_id' => $adjustmentLine->product_id,
//                    'source_location_id' => $transfer->source_location_id,
//                    'destination_location_id' => $transfer->destination_location_id,
                    'quantity_done' => $adjustmentLine->demand,
                ];
//                $product->updateQuantity($operationType, $adjustmentLine->demand);
            }
            if ($product->material()->exists()) {
//                ProductHasMaterialEvent::dispatch($transfer, $operationType, $product->material, $adjustmentLine->demand);
            }
        }
        if (count($stockMovementData)) {
            StockMovement::insertMany($stockMovementData);
        }
    }
}

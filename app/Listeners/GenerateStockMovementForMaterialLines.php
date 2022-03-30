<?php

namespace App\Listeners;

use App\Events\ProductHasMaterialEvent;
use App\Models\OperationType;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementForMaterialLines implements ShouldQueue
{
    public function handle(ProductHasMaterialEvent $event)
    {
        $transfer = $event->transfer;
        $operationType = $event->operationType;
        $material = $event->material;
        $materialLines = $material->materialLines;
        $stockMovementData = [];
        foreach ($materialLines as $materialLine) {
            $materialLineProduct = $materialLine->product;
            if (Product::isStorable($materialLineProduct->product_type)) {

                $sourceLocationId = $transfer->source_location_id;
                $destinationLocationId = $transfer->destination_location_id;

                if ($operationType->type === OperationType::ADJUSTMENT) {

                }

                $stockMovementData[] = [
                    'reference' => $transfer->reference,
                    'source' => $transfer->reference,
                    'product_id' => $materialLine->product_id,
                    'source_location_id' => $sourceLocationId,
                    'destination_location_id' => $destinationLocationId,
                    'quantity_done' => $materialLine->quantity * $event->demand,
                ];
            }
            if ($materialLineProduct->material()->exists()) {
                ProductHasMaterialEvent::dispatch($transfer, $operationType, $materialLineProduct->material, $materialLine->quantity);
            }
        }
        if (count($stockMovementData)) {
            StockMovement::insertMany($stockMovementData);
        }
    }
}

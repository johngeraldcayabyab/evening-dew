<?php

namespace App\Listeners;

use App\Events\ProductHasMaterialEvent;
use App\Events\TransferValidatedEvent;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementFromValidatedTransfer implements ShouldQueue
{
    public function handle(TransferValidatedEvent $event)
    {
        $transfer = $event->transfer;
        $transferLines = $transfer->transferLines;
        $stockMovementData = [];
        foreach ($transferLines as $transferLine) {
            $product = $transferLine->product;
            $sourceLocationId = $transfer->source_location_id;
            $destinationLocationId = $transfer->destination_location_id;
            if (Product::isStorable($product->product_type)) {
                $stockMovementData[] = [
                    'reference' => $transfer->reference,
                    'source' => $transfer->reference,
                    'product_id' => $transferLine->product_id,
                    'source_location_id' => $sourceLocationId,
                    'destination_location_id' => $destinationLocationId,
                    'quantity_done' => $transferLine->demand,
                ];
            }
            if ($product->material()->exists()) {
                ProductHasMaterialEvent::dispatch(
                    $transfer->reference,
                    $transfer->reference,
                    $sourceLocationId,
                    $destinationLocationId,
                    $product->material,
                    $transferLine->demand
                );
            }
        }
        if (count($stockMovementData)) {
            StockMovement::insertMany($stockMovementData);
        }
    }
}

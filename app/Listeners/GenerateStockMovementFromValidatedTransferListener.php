<?php

namespace App\Listeners;

use App\Events\ProductHasMaterialEvent;
use App\Events\TransferValidatedEvent;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\TransferLineStockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementFromValidatedTransferListener implements ShouldQueue
{
    public function handle(TransferValidatedEvent $event)
    {
        $transfer = $event->transfer;
        $stockMovementData = [];
        if (!$transfer->isDone($transfer->status)) {
            $transferLines = $transfer->transferLines;
            foreach ($transferLines as $transferLine) {
                $product = $transferLine->product;
                $sourceLocationId = $transfer->source_location_id;
                $destinationLocationId = $transfer->destination_location_id;
                if (Product::isStorable($product->product_type)) {
                    if ($transferLine->transferLineStockMovement()->exists()) {
                        $stockMovement = $transferLine->transferLineStockMovement->stockMovement;
                        $stockMovement->quantity_done = $transferLine->demand;
                        $stockMovement = $stockMovement->toArray();
                        unset($stockMovement['updated_at']);
                        $stockMovementData[] = $stockMovement;
                    } else {
                        $stockMovementData[] = [
                            'reference' => $transfer->reference,
                            'source' => $transfer->reference,
                            'product_id' => $transferLine->product_id,
                            'source_location_id' => $sourceLocationId,
                            'destination_location_id' => $destinationLocationId,
                            'quantity_done' => $transferLine->demand,
                            'created_at' => $transferLine->created_at,
                        ];
                    }
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
        }
        if (count($stockMovementData)) {
            StockMovement::massUpsert($stockMovementData);
            $transferLineStockMovementLines = [];
            $transferLines = $transfer->transferLines;
            foreach ($transferLines as $transferLine) {
                $stockMovement = StockMovement::where('product_id', $transferLine->product_id)
                    ->where('created_at', $transferLine->created_at)
                    ->first();
                $transferLineStockMovementLines[] = [
                    'transfer_id' => $transfer->id,
                    'transfer_line_id' => $transferLine->id,
                    'stock_movement_id' => $stockMovement->id,
                ];
            }
            if (count($transferLineStockMovementLines)) {
                TransferLineStockMovement::massUpsert($transferLineStockMovementLines);
            }
        }
    }
}

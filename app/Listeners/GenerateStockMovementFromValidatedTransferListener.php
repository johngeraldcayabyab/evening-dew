<?php

namespace App\Listeners;

use App\Events\ProductHasMaterialEvent;
use App\Events\TransferValidatedEvent;
use App\Models\OperationType;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\TransferLine;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class GenerateStockMovementFromValidatedTransferListener implements ShouldQueue
{
    public function handle(TransferValidatedEvent $event)
    {
        $transfer = $event->transfer;
        $transferLines = $transfer->transferLines;
        $operationType = $transfer->operationType;
        $stockMovementData = [];
        foreach ($transferLines as $transferLine) {
            $product = $transferLine->product;
            if ($product->product_type === Product::STORABLE) {
                $stockMovementData[] = [
                    'reference' => $transfer->reference,
                    'source' => $transfer->reference,
                    'product_id' => $transferLine->product_id,
                    'source_location_id' => $transfer->source_location_id,
                    'destination_location_id' => $transfer->destination_location_id,
                    'quantity_done' => $transferLine->demand,
                ];
                $this->computeProductQuantity($transferLine, $operationType);
            }
            if ($product->material()->exists()) {
                ProductHasMaterialEvent::dispatch($transfer, $transferLine, $operationType);
            }
        }
        if (count($stockMovementData)) {
            StockMovement::insertMany($stockMovementData);
        }
    }

    private function computeProductQuantity($transferLine, $operationType): void
    {
        $product = $transferLine->product;
        if ($operationType->type === OperationType::DELIVERY) {
            $product->quantity = $product->quantity - $transferLine->demand;
        } else if ($operationType->type === OperationType::RECEIPT) {
            $product->quantity = $product->quantity + $transferLine->demand;
        }
        $product->save();
    }
}

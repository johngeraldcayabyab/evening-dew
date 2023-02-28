<?php


namespace App\Listeners;

use App\Events\TransferValidated;
use App\Traits\StockTrait;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementFromValidatedTransfer implements ShouldQueue
{
    use StockTrait;

    public function handle(TransferValidated $event)
    {
        $transfer = $event->transfer;
        $transferLines = $transfer->transferLines;
        $stockMovementData = [];
        if (!$transfer->isDone($transfer->status)) {
            return;
        }
        foreach ($transferLines as $transferLine) {
            $stockMovement = $this->storableProductGenerateMovement([
                'reference' => $transfer->reference,
                'source' => $transfer->source_document,
                'product_id' => $transferLine->product_id,
                'source_location_id' => $transfer->source_location_id,
                'destination_location_id' => $transfer->destination_location_id,
                'quantity_done' => $transferLine->demand,
                'product_type' => $transferLine->product->product_type,
            ]);
            if ($stockMovement) {
                $stockMovementData[] = $stockMovement;
            }
            $this->hasMaterialGenerateMovement([
                'product' => $transferLine->product,
                'reference' => $transfer->reference,
                'source_document' => $transfer->source_document,
                'source_location_id' => $transfer->source_location_id,
                'destination_location_id' => $transfer->destination_location_id,
                'demand' => $transferLine->demand,
            ]);
        }
        $this->computeStockMovementData($stockMovementData);
    }
}

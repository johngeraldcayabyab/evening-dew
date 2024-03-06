<?php

namespace App\Listeners;

use App\Data\SystemSetting;
use App\Events\PurchaseValidated;
use App\Events\TransferValidated;
use App\Models\OperationType;
use App\Models\PurchaseSetting;
use App\Models\Transfer;
use App\Models\TransferLine;
use App\Services\MeasurementConversion;

class GenerateTransferFromValidatedPurchase
{
    public function handle(PurchaseValidated $event)
    {
        $purchaseSetting = PurchaseSetting::first();
        if (!$purchaseSetting->generate_transfer_on_validate) {
            return;
        }
        $purchase = $event->purchase;
        if ($this->isTransferExist($purchase->number)) {
            return;
        }
        $operationTypeReceipt = OperationType::defaultReceipt();
        if (!$operationTypeReceipt) {
            return;
        }
        $transfer = $this->createTransferAndLines($operationTypeReceipt, $purchase);
        if (!$purchaseSetting->validate_transfer_on_validate) {
            return;
        }
        $transfer->status = Transfer::DONE;
        $transfer->save();
        TransferValidated::dispatch($transfer);
    }

    private function isTransferExist($sourceDocument)
    {
        if (Transfer::where('source_document', $sourceDocument)->first()) {
            return true;
        }
        return false;
    }

    private function createTransferAndLines($operationType, $purchase)
    {
        $transfer = Transfer::create([
            'contact_id' => $purchase->vendor_id,
            'operation_type_id' => $operationType->id,
            'destination_location_id' => $operationType->default_destination_location_id,
            'scheduled_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'responsible_id' => $purchase->purchase_representative_id,
            'source_document' => $purchase->number,
            'shipping_method' => $purchase->shipping_method,
            'status' => Transfer::DRAFT,
        ]);
        $transferLines = $purchase->purchaseLines->map(function ($purchaseLine) {
            $transferDemand = MeasurementConversion::convertPurchaseMeasurement($purchaseLine);
            return [
                'product_id' => $purchaseLine->product_id,
                'description' => $purchaseLine->description,
                'demand' => $transferDemand,
                'measurement_id' => $purchaseLine->product->measurement_id,
            ];
        });
        if (count($transferLines)) {
            TransferLine::massUpsert($transferLines, $transfer);
        }
        return $transfer;
    }
}

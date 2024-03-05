<?php

namespace App\Listeners;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidated;
use App\Events\TransferValidated;
use App\Models\OperationType;
use App\Models\SalesSetting;
use App\Models\Transfer;
use App\Models\TransferLine;
use App\Services\MeasurementConversion;

class GenerateTransferFromValidatedSalesOrder
{
    public function handle(SalesOrderValidated $event): void
    {
        $salesSetting = SalesSetting::first();
        if (!$salesSetting->generate_transfer_on_validate) {
            return;
        }
        $salesOrder = $event->salesOrder;
        if ($this->isTransferExist($salesOrder->number)) {
            return;
        }
        $operationTypeDelivery = OperationType::defaultDelivery();
        if (!$operationTypeDelivery) {
            return;
        }
        $transfer = $this->createTransferAndLines($operationTypeDelivery, $salesOrder);
        if (!$salesSetting->validate_transfer_on_validate) {
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

    private function createTransferAndLines($operationType, $salesOrder)
    {
        $transfer = Transfer::create([
            'contact_id' => $salesOrder->customer_id,
            'operation_type_id' => $operationType->id,
            'source_location_id' => $operationType->default_source_location_id,
            'scheduled_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'responsible_id' => $salesOrder->salesperson_id,
            'source_document' => $salesOrder->number,
            'shipping_method' => $salesOrder->shipping_method,
            'status' => Transfer::DRAFT,
        ]);
        $transferLines = $salesOrder->salesOrderLines->map(function ($salesOrderLine) {
            $transferDemand = MeasurementConversion::convertSalesMeasurement($salesOrderLine);
            return [
                'product_id' => $salesOrderLine->product_id,
                'description' => $salesOrderLine->description,
                'demand' => $transferDemand,
                'measurement_id' => $salesOrderLine->product->measurement_id,
            ];
        });
        if (count($transferLines)) {
            TransferLine::massUpsert($transferLines, $transfer);
        }
        return $transfer;
    }
}

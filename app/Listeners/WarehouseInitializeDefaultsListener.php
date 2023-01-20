<?php

namespace App\Listeners;

use App\Events\WarehouseCreatedEvent;
use App\Models\Location;
use App\Models\OperationType;
use App\Models\Sequence;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Str;

class WarehouseInitializeDefaultsListener implements ShouldQueue
{
    private $viewLocation;
    private $stockLocation;
    private $inputLocation;
    private $qualityControlLocation;
    private $packingZoneLocation;
    private $outputLocation;
    private $postProductionLocation;
    private $preProductionLocation;
    private $adjustmentLocation;

    public function handle(WarehouseCreatedEvent $event)
    {
        $warehouse = $event->warehouse;
        $this->initializeWarehouseLocations($warehouse);

        $receiptsOperationType = $this->createReceiptsOperationType($warehouse, $this->stockLocation);
        $internalTransferOperationType = $this->createInternalTransferOperationType($warehouse, $this->stockLocation);
        $pickOperationType = $this->createPickOperationType($warehouse, $this->stockLocation, $this->packingZoneLocation);
        $packOperationType = $this->createPackOperationType($warehouse, $this->packingZoneLocation, $this->stockLocation);
        $deliveryOrderOperationType = $this->createDeliveryOrderOperationType($warehouse, $this->stockLocation);
        $returnsOperationType = $this->createReturnsOrderOperationType($warehouse, $this->stockLocation);
        $storeFinishedProductionOperationType = $this->createStoreFinishedProductOperationType($warehouse, $this->postProductionLocation, $this->stockLocation);
        $pickComponentsOperationType = $this->createPickComponentsOperationType($warehouse, $this->stockLocation, $this->preProductionLocation);
        $manufacturingOperationType = $this->createManufacturingOperationType($warehouse, $this->stockLocation);
        $adjustmentOperationType = $this->createAdjustmentOperationType($warehouse);


        $inSequence = $this->createInSequence($warehouse, $receiptsOperationType);
        $internalSequence = $this->createInternalSequence($warehouse, $internalTransferOperationType);
        $pickingSequence = $this->createPickingSequence($warehouse, $pickOperationType);
        $packingSequence = $this->createPackingSequence($warehouse, $packOperationType);
        $outSequence = $this->createOutSequence($warehouse, $deliveryOrderOperationType);
        $returnSequence = $this->createReturnSequence($warehouse, $returnsOperationType);
        $stockAfterManufacturingSequence = $this->createStockAfterManufacturingSequence($warehouse, $storeFinishedProductionOperationType);
        $pickingBeforeManufacturingSequence = $this->createPickingBeforeManufacturingSequence($warehouse, $pickComponentsOperationType);
        $productionSequence = $this->createProductionSequence($warehouse, $manufacturingOperationType);
        $adjustmentSequence = $this->createAdjustmentSequence($warehouse, $adjustmentOperationType);

        $receiptsOperationType->operation_type_for_returns_id = $deliveryOrderOperationType->id;
        $deliveryOrderOperationType->operation_type_for_returns_id = $returnsOperationType->id;

        $receiptsOperationType->reference_sequence_id = $inSequence->id;
        $internalTransferOperationType->reference_sequence_id = $internalSequence->id;
        $pickOperationType->reference_sequence_id = $pickingSequence->id;
        $packOperationType->reference_sequence_id = $packingSequence->id;
        $deliveryOrderOperationType->reference_sequence_id = $outSequence->id;
        $returnsOperationType->reference_sequence_id = $returnSequence->id;
        $storeFinishedProductionOperationType->reference_sequence_id = $stockAfterManufacturingSequence->id;
        $pickComponentsOperationType->reference_sequence_id = $pickingBeforeManufacturingSequence->id;
        $manufacturingOperationType->reference_sequence_id = $productionSequence->id;
        $adjustmentOperationType->reference_sequence_id = $adjustmentSequence->id;

        $receiptsOperationType->save();
        $internalTransferOperationType->save();
        $pickOperationType->save();
        $packOperationType->save();
        $deliveryOrderOperationType->save();
        $returnsOperationType->save();
        $storeFinishedProductionOperationType->save();
        $pickComponentsOperationType->save();
        $manufacturingOperationType->save();
        $adjustmentOperationType->save();

        $warehouse->view_location_id = $this->viewLocation->id;
        $warehouse->stock_location_id = $this->stockLocation->id;
        $warehouse->input_location_id = $this->inputLocation->id;
        $warehouse->quality_control_location_id = $this->qualityControlLocation->id;
        $warehouse->packing_location_id = $this->packingZoneLocation->id;
        $warehouse->output_location_id = $this->outputLocation->id;
        $warehouse->stock_after_manufacturing_location_id = $this->postProductionLocation->id;
        $warehouse->picking_before_manufacturing_location_id = $this->preProductionLocation->id;
        $warehouse->adjustment_location_id = $this->adjustmentLocation->id;

        $warehouse->in_type_id = $receiptsOperationType->id;
        $warehouse->internal_type_id = $internalTransferOperationType->id;
        $warehouse->pick_type_id = $pickOperationType->id;
        $warehouse->pack_type_id = $packOperationType->id;
        $warehouse->out_type_id = $deliveryOrderOperationType->id;
        $warehouse->stock_after_manufacturing_operation_type_id = $storeFinishedProductionOperationType->id;
        $warehouse->picking_before_manufacturing_operation_type_id = $pickComponentsOperationType->id;
        $warehouse->manufacturing_operation_type_id = $manufacturingOperationType->id;
        $warehouse->adjustment_operation_type_id = $adjustmentOperationType->id;

        $warehouse->save();
    }

    private function initializeWarehouseLocations($warehouse)
    {
        $this->viewLocation = $this->createViewLocation($warehouse);
        $this->stockLocation = $this->createStockLocation($this->viewLocation);
        $this->inputLocation = $this->createInputLocation($this->viewLocation);
        $this->qualityControlLocation = $this->createQualityControlLocation($this->viewLocation);
        $this->packingZoneLocation = $this->createPackingZoneLocation($this->viewLocation);
        $this->outputLocation = $this->createOutputLocation($this->viewLocation);
        $this->postProductionLocation = $this->createPostProductionLocation($this->viewLocation);
        $this->preProductionLocation = $this->createPreProductionLocation($this->viewLocation);
        $this->adjustmentLocation = $this->createAdjustmentLocation($this->viewLocation);
    }

    private function createViewLocation($warehouse)
    {
        $location = new Location();
        $location->type = Location::VIEW;
        $location->name = $warehouse->short_name;
        $location->save();
        return $location;
    }

    private function createStockLocation($parentLocation)
    {
        $location = new Location();
        $location->type = Location::INTERNAL;
        $location->name = 'Stock';
        $location->parent_location_id = $parentLocation->id;
        $location->save();
        return $location;
    }

    private function createInputLocation($parentLocation)
    {
        $location = new Location();
        $location->type = Location::INTERNAL;
        $location->name = 'Input';
        $location->parent_location_id = $parentLocation->id;
        $location->save();
        return $location;
    }

    private function createQualityControlLocation($parentLocation)
    {
        $location = new Location();
        $location->type = Location::INTERNAL;
        $location->name = 'Quality Control';
        $location->parent_location_id = $parentLocation->id;
        $location->save();
        return $location;
    }

    private function createPackingZoneLocation($parentLocation)
    {
        $location = new Location();
        $location->type = Location::INTERNAL;
        $location->name = 'Packing Zone';
        $location->parent_location_id = $parentLocation->id;
        $location->save();
        return $location;
    }

    private function createOutputLocation($parentLocation)
    {
        $location = new Location();
        $location->type = Location::INTERNAL;
        $location->name = 'Output';
        $location->parent_location_id = $parentLocation->id;
        $location->save();
        return $location;
    }

    private function createPostProductionLocation($parentLocation)
    {
        $location = new Location();
        $location->type = Location::INTERNAL;
        $location->name = 'Post-Production';
        $location->parent_location_id = $parentLocation->id;
        $location->save();
        return $location;
    }

    private function createPreProductionLocation($parentLocation)
    {
        $location = new Location();
        $location->type = Location::INTERNAL;
        $location->name = 'Pre-Production';
        $location->parent_location_id = $parentLocation->id;
        $location->save();
        return $location;
    }

    private function createAdjustmentLocation($parentLocation)
    {
        $location = new Location();
        $location->type = Location::INVENTORY_LOSS;
        $location->name = 'Adjustment';
        $location->parent_location_id = $parentLocation->id;
        $location->save();
        return $location;
    }

    /**
     * Operations Types
     */
    private function createReceiptsOperationType($warehouse, $destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Receipts";
        $operationType->code = 'IN';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->type = OperationType::RECEIPT;
        $operationType->create_new_lots_serial_numbers = true;
        $operationType->default_destination_location_id = $destinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createInternalTransferOperationType($warehouse, $sourceAndDestinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Internal Transfers";
        $operationType->code = 'INT';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::INTERNAL;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceAndDestinationLocation->id;
        $operationType->default_destination_location_id = $sourceAndDestinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createPickOperationType($warehouse, $sourceLocation, $destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Pick";
        $operationType->code = 'PICK';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::INTERNAL;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceLocation->id;
        $operationType->default_destination_location_id = $destinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createPackOperationType($warehouse, $sourceLocation, $destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Pack";
        $operationType->code = 'PACK';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::INTERNAL;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceLocation->id;
        $operationType->default_destination_location_id = $destinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createDeliveryOrderOperationType($warehouse, $sourceLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Delivery Orders";
        $operationType->code = 'OUT';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::DELIVERY;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createReturnsOrderOperationType($warehouse, $sourceLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Returns";
        $operationType->code = 'IN';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::RECEIPT;
        $operationType->show_detailed_operation = true;
        $operationType->pre_fill_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_destination_location_id = $sourceLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createStoreFinishedProductOperationType($warehouse, $sourceLocation, $destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Store Finished Product";
        $operationType->code = 'SFP';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::INTERNAL;
        $operationType->show_detailed_operation = true;
        $operationType->create_new_lots_serial_numbers = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceLocation->id;
        $operationType->default_destination_location_id = $destinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createPickComponentsOperationType($warehouse, $sourceLocation, $destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Pick Components";
        $operationType->code = 'PC';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::INTERNAL;
        $operationType->show_detailed_operation = true;
        $operationType->create_new_lots_serial_numbers = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceLocation->id;
        $operationType->default_destination_location_id = $destinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createManufacturingOperationType($warehouse, $sourceAndDestinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Manufacturing";
        $operationType->code = 'MO';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::MANUFACTURING;
        $operationType->default_source_location_id = $sourceAndDestinationLocation->id;
        $operationType->default_destination_location_id = $sourceAndDestinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createAdjustmentOperationType($warehouse)
    {
        $operationType = new OperationType();
        $operationType->name = "{$warehouse->name}: Adjustment";
        $operationType->code = 'ADJ';
        $operationType->warehouse_id = $warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::ADJUSTMENT;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->save();
        return $operationType;
    }

    private function createInSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} In Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createInternalSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} Internal Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }


    private function createPickingSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} Picking Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createPackingSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} Packing Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createOutSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} Out Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createReturnSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} Return Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/RET/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createStockAfterManufacturingSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} Stock After Manufacturing Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createPickingBeforeManufacturingSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} Picking Before Manufacturing Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createProductionSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} Production Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createAdjustmentSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} Adjustment Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function generateSequenceCodeFromName($name)
    {
        $explodedName = explode(' ', Str::lower($name));
        return implode('.', $explodedName);
    }
}

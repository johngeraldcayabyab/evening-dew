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
    private $warehouse;

    private $viewLocation;
    private $stockLocation;
    private $inputLocation;
    private $qualityControlLocation;
    private $packingZoneLocation;
    private $outputLocation;
    private $postProductionLocation;
    private $preProductionLocation;
    private $adjustmentLocation;

    private $receiptsOperationType;
    private $internalTransferOperationType;
    private $pickOperationType;
    private $packOperationType;
    private $deliveryOrderOperationType;
    private $returnsOperationType;
    private $storeFinishedProductionOperationType;
    private $pickComponentsOperationType;
    private $manufacturingOperationType;
    private $adjustmentOperationType;


    public function handle(WarehouseCreatedEvent $event)
    {
        $this->warehouse = $event->warehouse;
        $this->initializeWarehouseLocations();
        $this->initializeOperationTypes();

        $inSequence = $this->createInSequence();
        $internalSequence = $this->createInternalSequence();
        $pickingSequence = $this->createPickingSequence();
        $packingSequence = $this->createPackingSequence();
        $outSequence = $this->createOutSequence();
        $returnSequence = $this->createReturnSequence();
        $stockAfterManufacturingSequence = $this->createStockAfterManufacturingSequence();
        $pickingBeforeManufacturingSequence = $this->createPickingBeforeManufacturingSequence();
        $productionSequence = $this->createProductionSequence();
        $adjustmentSequence = $this->createAdjustmentSequence();

        $this->receiptsOperationType->operation_type_for_returns_id = $this->deliveryOrderOperationType->id;
        $this->deliveryOrderOperationType->operation_type_for_returns_id = $this->returnsOperationType->id;

        $this->receiptsOperationType->reference_sequence_id = $inSequence->id;
        $this->internalTransferOperationType->reference_sequence_id = $internalSequence->id;
        $this->pickOperationType->reference_sequence_id = $pickingSequence->id;
        $this->packOperationType->reference_sequence_id = $packingSequence->id;
        $this->deliveryOrderOperationType->reference_sequence_id = $outSequence->id;
        $this->returnsOperationType->reference_sequence_id = $returnSequence->id;
        $this->storeFinishedProductionOperationType->reference_sequence_id = $stockAfterManufacturingSequence->id;
        $this->pickComponentsOperationType->reference_sequence_id = $pickingBeforeManufacturingSequence->id;
        $this->manufacturingOperationType->reference_sequence_id = $productionSequence->id;
        $this->adjustmentOperationType->reference_sequence_id = $adjustmentSequence->id;

        $this->receiptsOperationType->save();
        $this->internalTransferOperationType->save();
        $this->pickOperationType->save();
        $this->packOperationType->save();
        $this->deliveryOrderOperationType->save();
        $this->returnsOperationType->save();
        $this->storeFinishedProductionOperationType->save();
        $this->pickComponentsOperationType->save();
        $this->manufacturingOperationType->save();
        $this->adjustmentOperationType->save();

        $this->warehouse->view_location_id = $this->viewLocation->id;
        $this->warehouse->stock_location_id = $this->stockLocation->id;
        $this->warehouse->input_location_id = $this->inputLocation->id;
        $this->warehouse->quality_control_location_id = $this->qualityControlLocation->id;
        $this->warehouse->packing_location_id = $this->packingZoneLocation->id;
        $this->warehouse->output_location_id = $this->outputLocation->id;
        $this->warehouse->stock_after_manufacturing_location_id = $this->postProductionLocation->id;
        $this->warehouse->picking_before_manufacturing_location_id = $this->preProductionLocation->id;
        $this->warehouse->adjustment_location_id = $this->adjustmentLocation->id;

        $this->warehouse->in_type_id = $this->receiptsOperationType->id;
        $this->warehouse->internal_type_id = $this->internalTransferOperationType->id;
        $this->warehouse->pick_type_id = $this->pickOperationType->id;
        $this->warehouse->pack_type_id = $this->packOperationType->id;
        $this->warehouse->out_type_id = $this->deliveryOrderOperationType->id;
        $this->warehouse->stock_after_manufacturing_operation_type_id = $this->storeFinishedProductionOperationType->id;
        $this->warehouse->picking_before_manufacturing_operation_type_id = $this->pickComponentsOperationType->id;
        $this->warehouse->manufacturing_operation_type_id = $this->manufacturingOperationType->id;
        $this->warehouse->adjustment_operation_type_id = $this->adjustmentOperationType->id;

        $this->warehouse->save();
    }

    private function initializeWarehouseLocations()
    {
        $this->viewLocation = $this->createViewLocation();
        $this->stockLocation = $this->createStockLocation($this->viewLocation);
        $this->inputLocation = $this->createInputLocation($this->viewLocation);
        $this->qualityControlLocation = $this->createQualityControlLocation($this->viewLocation);
        $this->packingZoneLocation = $this->createPackingZoneLocation($this->viewLocation);
        $this->outputLocation = $this->createOutputLocation($this->viewLocation);
        $this->postProductionLocation = $this->createPostProductionLocation($this->viewLocation);
        $this->preProductionLocation = $this->createPreProductionLocation($this->viewLocation);
        $this->adjustmentLocation = $this->createAdjustmentLocation($this->viewLocation);
    }

    private function initializeOperationTypes()
    {
        $this->receiptsOperationType = $this->createReceiptsOperationType($this->stockLocation);
        $this->internalTransferOperationType = $this->createInternalTransferOperationType($this->stockLocation);
        $this->pickOperationType = $this->createPickOperationType($this->stockLocation, $this->packingZoneLocation);
        $this->packOperationType = $this->createPackOperationType($this->packingZoneLocation, $this->stockLocation);
        $this->deliveryOrderOperationType = $this->createDeliveryOrderOperationType($this->stockLocation);
        $this->returnsOperationType = $this->createReturnsOrderOperationType($this->stockLocation);
        $this->storeFinishedProductionOperationType = $this->createStoreFinishedProductOperationType($this->postProductionLocation, $this->stockLocation);
        $this->pickComponentsOperationType = $this->createPickComponentsOperationType($this->stockLocation, $this->preProductionLocation);
        $this->manufacturingOperationType = $this->createManufacturingOperationType($this->stockLocation);
        $this->adjustmentOperationType = $this->createAdjustmentOperationType();
    }

    private function createViewLocation()
    {
        $location = new Location();
        $location->type = Location::VIEW;
        $location->name = $this->warehouse->short_name;
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
    private function createReceiptsOperationType($destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Receipts";
        $operationType->code = 'IN';
        $operationType->warehouse_id = $this->warehouse->id;
        $operationType->type = OperationType::RECEIPT;
        $operationType->create_new_lots_serial_numbers = true;
        $operationType->default_destination_location_id = $destinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createInternalTransferOperationType($sourceAndDestinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Internal Transfers";
        $operationType->code = 'INT';
        $operationType->warehouse_id = $this->warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::INTERNAL;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceAndDestinationLocation->id;
        $operationType->default_destination_location_id = $sourceAndDestinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createPickOperationType($sourceLocation, $destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Pick";
        $operationType->code = 'PICK';
        $operationType->warehouse_id = $this->warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::INTERNAL;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceLocation->id;
        $operationType->default_destination_location_id = $destinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createPackOperationType($sourceLocation, $destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Pack";
        $operationType->code = 'PACK';
        $operationType->warehouse_id = $this->warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::INTERNAL;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceLocation->id;
        $operationType->default_destination_location_id = $destinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createDeliveryOrderOperationType($sourceLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Delivery Orders";
        $operationType->code = 'OUT';
        $operationType->warehouse_id = $this->warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::DELIVERY;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_source_location_id = $sourceLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createReturnsOrderOperationType($sourceLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Returns";
        $operationType->code = 'IN';
        $operationType->warehouse_id = $this->warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::RECEIPT;
        $operationType->show_detailed_operation = true;
        $operationType->pre_fill_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->default_destination_location_id = $sourceLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createStoreFinishedProductOperationType($sourceLocation, $destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Store Finished Product";
        $operationType->code = 'SFP';
        $operationType->warehouse_id = $this->warehouse->id;
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

    private function createPickComponentsOperationType($sourceLocation, $destinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Pick Components";
        $operationType->code = 'PC';
        $operationType->warehouse_id = $this->warehouse->id;
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

    private function createManufacturingOperationType($sourceAndDestinationLocation)
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Manufacturing";
        $operationType->code = 'MO';
        $operationType->warehouse_id = $this->warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::MANUFACTURING;
        $operationType->default_source_location_id = $sourceAndDestinationLocation->id;
        $operationType->default_destination_location_id = $sourceAndDestinationLocation->id;
        $operationType->save();
        return $operationType;
    }

    private function createAdjustmentOperationType()
    {
        $operationType = new OperationType();
        $operationType->name = "{$this->warehouse->name}: Adjustment";
        $operationType->code = 'ADJ';
        $operationType->warehouse_id = $this->warehouse->id;
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::ADJUSTMENT;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->save();
        return $operationType;
    }

    private function createInSequence()
    {
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} In Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/{$this->receiptsOperationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createInternalSequence()
    {
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} Internal Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/{$this->internalTransferOperationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }


    private function createPickingSequence()
    {
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} Picking Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/{$this->pickOperationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createPackingSequence()
    {
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} Packing Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/{$this->packOperationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createOutSequence()
    {
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} Out Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/{$this->deliveryOrderOperationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createReturnSequence()
    {
        //$this->returnsOperationType
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} Return Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/RET/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createStockAfterManufacturingSequence()
    {
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} Stock After Manufacturing Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/{$this->storeFinishedProductionOperationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createPickingBeforeManufacturingSequence()
    {
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} Picking Before Manufacturing Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/{$this->pickComponentsOperationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createProductionSequence()
    {
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} Production Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/{$this->manufacturingOperationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
    }

    private function createAdjustmentSequence()
    {
        $sequence = new Sequence();
        $sequence->name = "{$this->warehouse->name} Adjustment Sequence";
        $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$this->warehouse->short_name}/{$this->adjustmentOperationType->code}/";
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

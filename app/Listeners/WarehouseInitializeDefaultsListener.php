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

    private $inSequence;
    private $internalSequence;
    private $pickingSequence;
    private $packingSequence;
    private $outSequence;
    private $returnSequence;
    private $stockAfterManufacturingSequence;
    private $pickingBeforeManufacturingSequence;
    private $productionSequence;
    private $adjustmentSequence;


    public function handle(WarehouseCreatedEvent $event)
    {
        $this->warehouse = $event->warehouse;
        $this->initializeWarehouseLocations();
        $this->initializeOperationTypes();
        $this->initializeSequences();
        $this->setReturnsAndSequencesForOperationTypes();
        $this->setWarehouseLocationsAndOperationTypes();
    }

    private function initializeWarehouseLocations()
    {
        $this->createViewLocation();
        $this->createStockLocation();
        $this->createInputLocation();
        $this->createQualityControlLocation();
        $this->createPackingZoneLocation();
        $this->createOutputLocation();
        $this->createPostProductionLocation();
        $this->createPreProductionLocation();
        $this->createAdjustmentLocation();
    }

    private function initializeOperationTypes()
    {
        $this->createReceiptsOperationType($this->stockLocation);
        $this->createInternalTransferOperationType($this->stockLocation);
        $this->createPickOperationType($this->stockLocation, $this->packingZoneLocation);
        $this->createPackOperationType($this->packingZoneLocation, $this->stockLocation);
        $this->createDeliveryOrderOperationType($this->stockLocation);
        $this->createReturnsOrderOperationType($this->stockLocation);
        $this->createStoreFinishedProductOperationType($this->postProductionLocation, $this->stockLocation);
        $this->createPickComponentsOperationType($this->stockLocation, $this->preProductionLocation);
        $this->createManufacturingOperationType($this->stockLocation);
        $this->createAdjustmentOperationType();
    }

    private function initializeSequences()
    {
        $this->inSequence = $this->createInSequence();
        $this->internalSequence = $this->createInternalSequence();
        $this->pickingSequence = $this->createPickingSequence();
        $this->packingSequence = $this->createPackingSequence();
        $this->outSequence = $this->createOutSequence();
        $this->returnSequence = $this->createReturnSequence();
        $this->stockAfterManufacturingSequence = $this->createStockAfterManufacturingSequence();
        $this->pickingBeforeManufacturingSequence = $this->createPickingBeforeManufacturingSequence();
        $this->productionSequence = $this->createProductionSequence();
        $this->adjustmentSequence = $this->createAdjustmentSequence();
    }

    private function setReturnsAndSequencesForOperationTypes()
    {
        $this->receiptsOperationType->operation_type_for_returns_id = $this->deliveryOrderOperationType->id;
        $this->deliveryOrderOperationType->operation_type_for_returns_id = $this->returnsOperationType->id;

        $this->receiptsOperationType->reference_sequence_id = $this->inSequence->id;
        $this->internalTransferOperationType->reference_sequence_id = $this->internalSequence->id;
        $this->pickOperationType->reference_sequence_id = $this->pickingSequence->id;
        $this->packOperationType->reference_sequence_id = $this->packingSequence->id;
        $this->deliveryOrderOperationType->reference_sequence_id = $this->outSequence->id;
        $this->returnsOperationType->reference_sequence_id = $this->returnSequence->id;
        $this->storeFinishedProductionOperationType->reference_sequence_id = $this->stockAfterManufacturingSequence->id;
        $this->pickComponentsOperationType->reference_sequence_id = $this->pickingBeforeManufacturingSequence->id;
        $this->manufacturingOperationType->reference_sequence_id = $this->productionSequence->id;
        $this->adjustmentOperationType->reference_sequence_id = $this->adjustmentSequence->id;

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
    }

    private function setWarehouseLocationsAndOperationTypes()
    {
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

    private function createViewLocation()
    {
        $this->viewLocation = Location::create([
            'type' => Location::VIEW,
            'name' => $this->warehouse->short_name,
        ]);
    }

    private function createStockLocation()
    {
        $this->stockLocation = Location::create([
            'type' => Location::INTERNAL,
            'name' => 'Stock',
            'parent_location_id' => $this->viewLocation->id,
        ]);
    }

    private function createInputLocation()
    {
        $this->inputLocation = Location::create([
            'type' => Location::INTERNAL,
            'name' => 'Input',
            'parent_location_id' => $this->viewLocation->id,
        ]);
    }

    private function createQualityControlLocation()
    {
        $this->qualityControlLocation = Location::create([
            'type' => Location::INTERNAL,
            'name' => 'Quality Control',
            'parent_location_id' => $this->viewLocation->id,
        ]);
    }

    private function createPackingZoneLocation()
    {
        $this->packingZoneLocation = Location::create([
            'type' => Location::INTERNAL,
            'name' => 'Packing Zone',
            'parent_location_id' => $this->viewLocation->id,
        ]);

    }

    private function createOutputLocation()
    {
        $this->outputLocation = Location::create([
            'type' => Location::INTERNAL,
            'name' => 'Output',
            'parent_location_id' => $this->viewLocation->id,
        ]);
    }

    private function createPostProductionLocation()
    {
        $this->postProductionLocation = Location::create([
            'type' => Location::INTERNAL,
            'name' => 'Post-Production',
            'parent_location_id' => $this->viewLocation->id,
        ]);
    }

    private function createPreProductionLocation()
    {
        $this->preProductionLocation = Location::create([
            'type' => Location::INTERNAL,
            'name' => 'Pre-Production',
            'parent_location_id' => $this->viewLocation->id,
        ]);
    }

    private function createAdjustmentLocation()
    {
        $this->adjustmentLocation = Location::create([
            'type' => Location::INVENTORY_LOSS,
            'name' => 'Adjustment',
            'parent_location_id' => $this->viewLocation->id,
        ]);
    }

    /**
     * Operations Types
     */
    private function createReceiptsOperationType($destinationLocation)
    {
        $this->receiptsOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Receipts",
            'code' => 'IN',
            'warehouse_id' => $this->warehouse->id,
            'type' => OperationType::RECEIPT,
            'create_new_lots_serial_numbers' => true,
            'default_destination_location_id' => $destinationLocation->id,
        ]);
    }

    private function createInternalTransferOperationType($sourceAndDestinationLocation)
    {
        $this->internalTransferOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Internal Transfers",
            'code' => 'INT',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::INTERNAL,
            'show_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $sourceAndDestinationLocation->id,
            'default_destination_location_id' => $sourceAndDestinationLocation->id,
        ]);
    }

    private function createPickOperationType($sourceLocation, $destinationLocation)
    {
        $this->pickOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Pick",
            'code' => 'PICK',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::INTERNAL,
            'show_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $sourceLocation->id,
            'default_destination_location_id' => $destinationLocation->id,
        ]);
    }

    private function createPackOperationType($sourceLocation, $destinationLocation)
    {
        $this->packOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Pack",
            'code' => 'PACK',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::INTERNAL,
            'show_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $sourceLocation->id,
            'default_destination_location_id' => $destinationLocation->id,
        ]);
    }

    private function createDeliveryOrderOperationType($sourceLocation)
    {
        $this->deliveryOrderOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Delivery Orders",
            'code' => 'OUT',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::DELIVERY,
            'show_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $sourceLocation->id,
        ]);
    }

    private function createReturnsOrderOperationType($sourceLocation)
    {
        $this->returnsOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Returns",
            'code' => 'IN',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::RECEIPT,
            'show_detailed_operation' => true,
            'pre_fill_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_destination_location_id' => $sourceLocation->id,
        ]);
    }

    private function createStoreFinishedProductOperationType($sourceLocation, $destinationLocation)
    {
        $this->storeFinishedProductionOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Store Finished Product",
            'code' => 'SFP',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::INTERNAL,
            'show_detailed_operation' => true,
            'create_new_lots_serial_numbers' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $sourceLocation->id,
            'default_destination_location_id' => $destinationLocation->id,
        ]);
    }

    private function createPickComponentsOperationType($sourceLocation, $destinationLocation)
    {
        $this->pickComponentsOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Pick Components",
            'code' => 'PC',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::INTERNAL,
            'show_detailed_operation' => true,
            'create_new_lots_serial_numbers' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $sourceLocation->id,
            'default_destination_location_id' => $destinationLocation->id,
        ]);
    }

    private function createManufacturingOperationType($sourceAndDestinationLocation)
    {
        $this->manufacturingOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Manufacturing",
            'code' => 'MO',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::MANUFACTURING,
            'default_source_location_id' => $sourceAndDestinationLocation->id,
            'default_destination_location_id' => $sourceAndDestinationLocation->id,
        ]);
    }

    private function createAdjustmentOperationType()
    {
        $this->adjustmentOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Adjustment",
            'code' => 'ADJ',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::ADJUSTMENT,
            'show_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
        ]);
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

<?php

namespace App\Listeners;

use App\Events\WarehouseCreated;
use App\Models\Location;
use App\Models\OperationType;
use App\Models\Sequence;

class WarehouseInitializeDefaultsListener
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


    public function handle(WarehouseCreated $event)
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
        $this->createReceiptsOperationType();
        $this->createInternalTransferOperationType();
        $this->createPickOperationType();
        $this->createPackOperationType();
        $this->createDeliveryOrderOperationType();
        $this->createReturnsOrderOperationType();
        $this->createStoreFinishedProductOperationType();
        $this->createPickComponentsOperationType();
        $this->createManufacturingOperationType();
        $this->createAdjustmentOperationType();
    }

    private function initializeSequences()
    {
        $this->createInSequence();
        $this->createInternalSequence();
        $this->createPickingSequence();
        $this->createPackingSequence();
        $this->createOutSequence();
        $this->createReturnSequence();
        $this->createStockAfterManufacturingSequence();
        $this->createPickingBeforeManufacturingSequence();
        $this->createProductionSequence();
        $this->createAdjustmentSequence();
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
    private function createReceiptsOperationType()
    {
        $this->receiptsOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Receipts",
            'code' => 'IN',
            'warehouse_id' => $this->warehouse->id,
            'type' => OperationType::RECEIPT,
            'create_new_lots_serial_numbers' => true,
            'default_destination_location_id' => $this->stockLocation->id,
        ]);
    }

    private function createInternalTransferOperationType()
    {
        $this->internalTransferOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Internal Transfers",
            'code' => 'INT',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::INTERNAL,
            'show_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $this->stockLocation->id,
            'default_destination_location_id' => $this->stockLocation->id,
        ]);
    }

    private function createPickOperationType()
    {
        $this->pickOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Pick",
            'code' => 'PICK',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::INTERNAL,
            'show_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $this->stockLocation->id,
            'default_destination_location_id' => $this->packingZoneLocation->id,
        ]);
    }

    private function createPackOperationType()
    {
        $this->packOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Pack",
            'code' => 'PACK',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::INTERNAL,
            'show_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $this->packingZoneLocation->id,
            'default_destination_location_id' => $this->stockLocation->id,
        ]);
    }

    private function createDeliveryOrderOperationType()
    {
        $this->deliveryOrderOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Delivery Orders",
            'code' => 'OUT',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::DELIVERY,
            'show_detailed_operation' => true,
            'use_existing_lots_serial_numbers' => true,
            'default_source_location_id' => $this->stockLocation->id,
        ]);
    }

    private function createReturnsOrderOperationType()
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
            'default_destination_location_id' => $this->stockLocation->id,
        ]);
    }

    private function createStoreFinishedProductOperationType()
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
            'default_source_location_id' => $this->postProductionLocation->id,
            'default_destination_location_id' => $this->stockLocation->id,
        ]);
    }

    private function createPickComponentsOperationType()
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
            'default_source_location_id' => $this->stockLocation->id,
            'default_destination_location_id' => $this->preProductionLocation->id,
        ]);
    }

    private function createManufacturingOperationType()
    {
        $this->manufacturingOperationType = OperationType::create([
            'name' => "{$this->warehouse->name}: Manufacturing",
            'code' => 'MO',
            'warehouse_id' => $this->warehouse->id,
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'type' => OperationType::MANUFACTURING,
            'default_source_location_id' => $this->stockLocation->id,
            'default_destination_location_id' => $this->stockLocation->id,
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
        $this->inSequence = Sequence::create([
            'name' => "{$this->warehouse->name} In Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/{$this->receiptsOperationType->code}/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);
    }

    private function createInternalSequence()
    {
        $this->internalSequence = Sequence::create([
            'name' => "{$this->warehouse->name} Internal Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/{$this->internalTransferOperationType->code}/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);
    }

    private function createPickingSequence()
    {
        $this->pickingSequence = Sequence::create([
            'name' => "{$this->warehouse->name} Picking Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/{$this->pickOperationType->code}/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);
    }

    private function createPackingSequence()
    {
        $this->packingSequence = Sequence::create([
            'name' => "{$this->warehouse->name} Packing Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/{$this->packOperationType->code}/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);
    }

    private function createOutSequence()
    {
        $this->outSequence = Sequence::create([
            'name' => "{$this->warehouse->name} Out Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/{$this->deliveryOrderOperationType->code}/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);
    }

    private function createReturnSequence()
    {
        $this->returnSequence = Sequence::create([
            'name' => "{$this->warehouse->name} Return Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/RET/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);

    }

    private function createStockAfterManufacturingSequence()
    {
        $this->stockAfterManufacturingSequence = Sequence::create([
            'name' => "{$this->warehouse->name} Stock After Manufacturing Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/{$this->storeFinishedProductionOperationType->code}/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);
    }

    private function createPickingBeforeManufacturingSequence()
    {
        $this->pickingBeforeManufacturingSequence = Sequence::create([
            'name' => "{$this->warehouse->name} Picking Before Manufacturing Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/{$this->pickComponentsOperationType->code}/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);
    }

    private function createProductionSequence()
    {
        $this->productionSequence = Sequence::create([
            'name' => "{$this->warehouse->name} Production Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/{$this->manufacturingOperationType->code}/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);
    }

    private function createAdjustmentSequence()
    {
        $this->adjustmentSequence = Sequence::create([
            'name' => "{$this->warehouse->name} Adjustment Sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$this->warehouse->short_name}/{$this->adjustmentOperationType->code}/",
            'sequence_size' => 6,
            'step' => 1,
            'next_number' => 0,
        ]);
    }
}

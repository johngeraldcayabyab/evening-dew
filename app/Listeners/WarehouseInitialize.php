<?php

namespace App\Listeners;

use App\Events\WarehouseCreated;
use App\Models\Location;
use App\Models\OperationType;
use App\Models\Sequence;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class WarehouseInitialize
{
    public function handle(WarehouseCreated $event)
    {
        $warehouse = $event->warehouse;
        $viewLocation = $this->createViewLocation($warehouse);
        $stockLocation = $this->createStockLocation($viewLocation);
        $inputLocation = $this->createInputLocation($viewLocation);
        $qualityControlLocation = $this->createQualityControlLocation($viewLocation);
        $packingZoneLocation = $this->createPackingZoneLocation($viewLocation);
        $outputLocation = $this->createOutputLocation($viewLocation);
        $postProductionLocation = $this->createPostProductionLocation($viewLocation);
        $preProductionLocation = $this->createPreProductionLocation($viewLocation);


        $receiptsOperationType = $this->createReceiptsOperationType($warehouse, $stockLocation);
        $internalTransferOperationType = $this->createInternalTransferOperationType($warehouse, $stockLocation);
        $pickOperationType = $this->createPickOperationType($warehouse, $stockLocation, $packingZoneLocation);
        $packOperationType = $this->createPackOperationType($warehouse, $packingZoneLocation, $stockLocation);
        $deliveryOrderOperationType = $this->createDeliveryOrderOperationType($warehouse, $stockLocation);
        $returnsOperationType = $this->createReturnsOrderOperationType($warehouse, $stockLocation);
        $storeFinishedProductionOperationType = $this->createStoreFinishedProductOperationType($warehouse, $postProductionLocation, $stockLocation);
        $pickComponentsOperationType = $this->createPickComponentsOperationType($warehouse, $stockLocation, $preProductionLocation);
        $manufacturingOperationType = $this->createManufacturingOperationType($warehouse, $stockLocation);


        $inSequence = $this->createInSequence($warehouse, $receiptsOperationType);
        $internalSequence = $this->createInternalSequence($warehouse, $internalTransferOperationType);
        $pickingSequence = $this->createPickingSequence($warehouse, $pickOperationType);
        $packingSequence = $this->createPackingSequence($warehouse, $packOperationType);
        $outSequence = $this->createOutSequence($warehouse, $deliveryOrderOperationType);
        $returnSequence = $this->createReturnSequence($warehouse, $returnsOperationType);
        $stockAfterManufacturingSequence = $this->createStockAfterManufacturingSequence($warehouse, $storeFinishedProductionOperationType);
        $pickingBeforeManufacturingSequence = $this->createPickingBeforeManufacturingSequence($warehouse, $pickComponentsOperationType);
        $productionSequence = $this->createProductionSequence($warehouse, $manufacturingOperationType);

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

        $receiptsOperationType->save();
        $internalTransferOperationType->save();
        $pickOperationType->save();
        $packOperationType->save();
        $deliveryOrderOperationType->save();
        $returnsOperationType->save();
        $storeFinishedProductionOperationType->save();
        $pickComponentsOperationType->save();
        $manufacturingOperationType->save();

        $warehouse->view_location_id = $viewLocation->id;
        $warehouse->stock_location_id = $stockLocation->id;
        $warehouse->input_location_id = $inputLocation->id;
        $warehouse->quality_control_location_id = $qualityControlLocation->id;
        $warehouse->packing_location_id = $packingZoneLocation->id;
        $warehouse->output_location_id = $outputLocation->id;
        $warehouse->stock_after_manufacturing_location_id = $postProductionLocation->id;
        $warehouse->picking_before_manufacturing_location_id = $preProductionLocation->id;

        $warehouse->in_type_id = $receiptsOperationType->id;
        $warehouse->internal_type_id = $internalTransferOperationType->id;
        $warehouse->pick_type_id = $pickOperationType->id;
        $warehouse->pack_type_id = $packOperationType->id;
        $warehouse->out_type_id = $deliveryOrderOperationType->id;
        $warehouse->stock_after_manufacturing_operation_type_id = $storeFinishedProductionOperationType->id;
        $warehouse->picking_before_manufacturing_operation_type_id = $pickComponentsOperationType->id;
        $warehouse->manufacturing_operation_type_id = $manufacturingOperationType->id;

        $warehouse->save();
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

    private function createInSequence($warehouse, $operationType)
    {
        $sequence = new Sequence();
        $sequence->name = "{$warehouse->name} In Sequence";
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
        $sequence->implementation = Sequence::STANDARD;
        $sequence->prefix = "{$warehouse->short_name}/{$operationType->code}/";
        $sequence->sequence_size = 6;
        $sequence->step = 1;
        $sequence->next_number = 0;
        $sequence->save();
        return $sequence;
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
}

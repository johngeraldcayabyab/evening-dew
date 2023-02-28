<?php

namespace App\Services\LocationCompute;

use App\Models\Location;

class InventoryLossCompute
{
    private $destinationLocation;
    private $quantityDone;

    public function __construct($stockMovement)
    {
        $this->destinationLocation = $stockMovement->destinationLocation;
        $this->quantityDone = $stockMovement->quantity_done;
    }

    public function handle($initialQuantity)
    {
        $destinationLocation = $this->destinationLocation;
        $quantityDone = $this->quantityDone;
        if (Location::isCustomer($destinationLocation)) { // what does this even do
            return $initialQuantity;
        }
        if (Location::isInternal($destinationLocation)) {
            return $initialQuantity + $quantityDone;
        }
        if (Location::isInventoryLoss($destinationLocation)) {
            return $initialQuantity;
        }
        if (Location::isVendor($destinationLocation)) {
            return $initialQuantity;
        }
        return $initialQuantity;
    }
}

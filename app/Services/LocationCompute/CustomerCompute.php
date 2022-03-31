<?php

namespace App\Services\LocationCompute;

use App\Models\Location;

class CustomerCompute
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
        if (Location::isCustomer($destinationLocation)) {
            return $initialQuantity;
        }
        if (Location::isInternal($destinationLocation)) {
            return $initialQuantity + $this->quantityDone;
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

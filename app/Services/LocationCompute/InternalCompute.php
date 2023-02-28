<?php

namespace App\Services\LocationCompute;

use App\Models\Location;

class InternalCompute
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
        $quantityDone = $this->quantityDone;

        $destinationLocation = $this->destinationLocation;
        if (Location::isCustomer($destinationLocation)) {
            return $initialQuantity - $quantityDone;
        }
        if (Location::isInternal($destinationLocation)) {
            return $initialQuantity;
        }
        if (Location::isInventoryLoss($destinationLocation)) {
            return $initialQuantity - $quantityDone;
        }
        if (Location::isVendor($destinationLocation)) {
            return $initialQuantity - $quantityDone;
        }
        return $initialQuantity;
    }
}

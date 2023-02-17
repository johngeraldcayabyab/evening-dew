<?php

namespace App\Events;

use App\Models\Material;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProductHasMaterial
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $reference;
    public $source;
    public $sourceLocationId;
    public $destinationLocationId;
    public $material;
    public $demand;

    public function __construct($reference, $source, $sourceLocationId, $destinationLocationId, Material $material, $demand)
    {
        $this->reference = $reference;
        $this->source = $source;
        $this->sourceLocationId = $sourceLocationId;
        $this->destinationLocationId = $destinationLocationId;
        $this->material = $material;
        $this->demand = $demand;
    }
}

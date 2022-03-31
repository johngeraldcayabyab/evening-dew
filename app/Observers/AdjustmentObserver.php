<?php

namespace App\Observers;

use App\Models\Adjustment;
use App\Models\Sequence;

class AdjustmentObserver
{
    public function created(Adjustment $adjustment)
    {
        $warehouse = $adjustment->warehouse;
        $operationType = $warehouse->adjustmentOperationType;
        $adjustmentSequence = $operationType->referenceSequence;
        if ($adjustmentSequence) {
            $adjustment->number = Sequence::generateSequence($adjustmentSequence->id);
            $adjustmentSequence->next_number = $adjustmentSequence->next_number + $adjustmentSequence->step;
            $adjustmentSequence->save();
        }
    }
}

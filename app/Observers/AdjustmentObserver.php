<?php

namespace App\Observers;

use App\Models\Adjustment;
use App\Models\Sequence;

class AdjustmentObserver
{
    public function created(Adjustment $model)
    {
        $warehouse = $model->warehouse;
        $operationType = $warehouse->adjustmentOperationType;
        $adjustmentSequence = $operationType->referenceSequence;
        if ($adjustmentSequence) {
            $model->number = Sequence::generateSequence($adjustmentSequence->id);
            $adjustmentSequence->next_number = $adjustmentSequence->next_number + $adjustmentSequence->step;
            $adjustmentSequence->save();
        }
    }
}

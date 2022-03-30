<?php

namespace App\Observers;

use App\Models\Adjustment;
use App\Models\GlobalSetting;

class AdjustmentObserver
{
    public function created(Adjustment $model)
    {
        $adjustmentDefaultSequence = GlobalSetting::latestFirst()->adjustmentDefaultSequence;
        if ($adjustmentDefaultSequence) {
            $adjustmentDefaultSequence->next_number = $adjustmentDefaultSequence->next_number + $adjustmentDefaultSequence->step;
            $adjustmentDefaultSequence->save();
        }
    }
}

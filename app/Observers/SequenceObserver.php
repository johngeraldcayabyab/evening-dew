<?php

namespace App\Observers;

use App\Models\Sequence;
use Illuminate\Support\Str;

class SequenceObserver
{
    public function creating(Sequence $sequence)
    {
        if (!strlen($sequence->sequence_code)) {
            $sequence->sequence_code = $this->generateSequenceCodeFromName($sequence->name);
        }
    }

    private function generateSequenceCodeFromName($name)
    {
        $explodedName = explode(' ', Str::lower($name));
        return implode('.', $explodedName);
    }
}

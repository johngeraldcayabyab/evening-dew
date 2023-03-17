<?php

namespace App\Listeners;

use App\Events\JournalCreated;
use App\Models\Journal;
use App\Models\Sequence;
use Illuminate\Support\Str;

class CreateSequenceFromNewJournal
{
    public function handle(JournalCreated $event)
    {
        $journal = $event->journal;
        $sequenceCode = Str::snake($journal->name . " sequence", '.');
        Sequence::create([
            'name' => $journal->name . " sequence",
            'sequence_code' => $sequenceCode,
            'implementation' => Sequence::STANDARD,
            'prefix' => "{$journal->short_code}/",
            'sequence_size' => Sequence::SEQUENCE_SIZE,
            'step' => Sequence::STEP,
            'next_number' => Sequence::NEXT_NUMBER,
        ]);
    }
}

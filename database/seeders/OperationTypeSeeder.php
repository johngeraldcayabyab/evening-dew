<?php

namespace Database\Seeders;

use App\Models\OperationType;
use App\Models\Sequence;
use Illuminate\Database\Seeder;

class OperationTypeSeeder extends Seeder
{
    public function run()
    {
        $sequence = Sequence::create([
            'name' => "Adjustment Sequence",
            'sequence_code' => "adjustment.sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "ADJ/",
            'sequence_size' => Sequence::SEQUENCE_SIZE,
            'step' => Sequence::STEP,
            'next_number' => Sequence::NEXT_NUMBER,
        ]);

        $operationType = new OperationType();
        $operationType->name = "Adjustment";
        $operationType->code = 'ADJ';
        $operationType->reservation_method = OperationType::AT_CONFIRMATION;
        $operationType->type = OperationType::ADJUSTMENT;
        $operationType->show_detailed_operation = true;
        $operationType->use_existing_lots_serial_numbers = true;
        $operationType->reference_sequence_id = $sequence->id;
        $operationType->save();
    }
}

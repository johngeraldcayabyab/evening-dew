<?php

namespace Database\Seeders;

use App\Models\Sequence;
use Illuminate\Database\Seeder;

class SequenceSeeder extends Seeder
{
    public function run()
    {
        Sequence::create([
            'name' => "Sales Order Sequence",
            'sequence_code' => "sales.order.sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "S/O/",
            'sequence_size' => Sequence::SEQUENCE_SIZE,
            'step' => Sequence::STEP,
            'next_number' => Sequence::NEXT_NUMBER,
        ]);
        Sequence::create([
            'name' => "Purchase Sequence",
            'sequence_code' => "purchase.sequence",
            'implementation' => Sequence::STANDARD,
            'prefix' => "P/O/",
            'sequence_size' => Sequence::SEQUENCE_SIZE,
            'step' => Sequence::STEP,
            'next_number' => Sequence::NEXT_NUMBER,
        ]);
    }
}

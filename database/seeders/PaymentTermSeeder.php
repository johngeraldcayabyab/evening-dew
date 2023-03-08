<?php

namespace Database\Seeders;

use App\Models\Measurement;
use App\Models\PaymentTerm;
use Illuminate\Database\Seeder;

class PaymentTermSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['name' => 'Immediate Payment'],
            ['name' => '15 Days'],
            ['name' => '21 Days'],
            ['name' => '30 Days'],
            ['name' => '45 Days'],
            ['name' => '2 Months'],
        ];
        foreach ($data as $datum) {
            PaymentTerm::create($datum);
        }
    }
}

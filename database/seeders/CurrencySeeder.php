<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    public function run()
    {
        Currency::create([
            'currency' => 'PHP',
            'name' => 'Philippine peso',
            'unit' => 'Peso',
            'sub_unit' => 'centavos',
            'rounding_factor' => 0.010000,
            'decimal_places' => 2,
            'symbol' => '₱',
            'symbol_position' => Currency::AFTER_AMOUNT,
            'is_default' => true,
        ]);
    }
}

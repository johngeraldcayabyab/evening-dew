<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    public function run()
    {
        Country::create([
            'country_name' => 'Philippines',
            'currency_id' => 1,
            'country_code' => 'PH',
            'country_calling_code' => '63',
            'vat_label' => 0.010000,
            'is_default' => true,
        ]);
    }
}

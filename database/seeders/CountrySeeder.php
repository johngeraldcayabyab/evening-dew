<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'country_name' => 'Philippines',
                'currency_id' => 1,
                'country_code' => 'PH',
                'country_calling_code' => '63',
                'vat_label' => 0.010000,
            ],
        ];

        foreach ($data as $datum) {
            Country::create($datum);
        }
    }
}

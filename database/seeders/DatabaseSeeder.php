<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            CountrySeeder::class,
            CurrencySeeder::class,
            GlobalSettingSeeder::class,
            LocationSeeder::class,
            MeasurementCategorySeeder::class,
            MeasurementSeeder::class,
            MenuSeeder::class,
            ProductCategorySeeder::class,
            SequenceSeeder::class,
            UserSeeder::class,
            WarehouseSeeder::class
        ]);
    }
}

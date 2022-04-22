<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            AppMenuSeeder::class,
            CountrySeeder::class,
            CurrencySeeder::class,
            GlobalSettingSeeder::class,
            LocationSeeder::class,
            MeasurementCategorySeeder::class,
            MeasurementSeeder::class,
            MenuSeeder::class,
            OperationTypeSeeder::class,
            ProductCategorySeeder::class,
            RegionSeeder::class,
            SequenceSeeder::class,
            UserSeeder::class,
            WarehouseSeeder::class
        ]);
    }
}

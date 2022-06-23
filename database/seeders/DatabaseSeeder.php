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
            DeliveryFeeSeeder::class,
            GlobalSettingSeeder::class,
            LocationSeeder::class,
            MeasurementCategorySeeder::class,
            MeasurementSeeder::class,
            MenuSeeder::class,
            OperationTypeSeeder::class,
            ProductCategorySeeder::class,
            ProductSeeder::class,
            RegionSeeder::class,
            CitySeeder::class,
            SequenceSeeder::class,
            SourceSeeder::class,
            UserSeeder::class,
            WarehouseSeeder::class
        ]);
    }
}

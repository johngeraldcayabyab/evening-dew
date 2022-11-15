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
            CourierSeeder::class,
            CurrencySeeder::class,
            GlobalSettingSeeder::class,
            LocationSeeder::class,
            MeasurementCategorySeeder::class,
            MeasurementSeeder::class,
            MenuSeeder::class,
            OperationTypeSeeder::class,
            ProductCategorySeeder::class,
            RegionSeeder::class,
            CitySeeder::class,
            SequenceSeeder::class,
            SourceSeeder::class,
            UserSeeder::class,
            GroupSeeder::class,
            WarehouseSeeder::class,


            AccessRightSeeder::class, // Need GroupSeeder as a pre-requisite
            UserGroupLineSeeder::class
        ]);
    }
}

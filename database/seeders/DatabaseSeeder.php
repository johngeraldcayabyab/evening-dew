<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            AppMenuSeeder::class,
            ChartOfAccountSeeder::class,
            CountrySeeder::class,
            CourierSeeder::class,
            CurrencySeeder::class,
            JournalSeeder::class,
            LocationSeeder::class,
            MeasurementCategorySeeder::class,
            MeasurementSeeder::class,
            MenuSeeder::class,
            OperationTypeSeeder::class,
            PaymentTermSeeder::class,
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

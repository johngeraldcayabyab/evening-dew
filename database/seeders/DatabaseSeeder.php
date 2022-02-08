<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            GlobalSettingSeeder::class,
            MeasurementCategorySeeder::class,
            MeasurementSeeder::class,
            MenuSeeder::class,
            ProductCategorySeeder::class,
            UserSeeder::class
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Modules\MeasurementCategory\Seeders\MeasurementCategorySeeder;
use App\Modules\Menu\Seeders\MenuSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            MeasurementCategorySeeder::class,
            MenuSeeder::class
        ]);
    }
}

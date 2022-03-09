<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    public function run()
    {
        Warehouse::create([
            "name" => "Warehouse",
            "short_name" => "WH",
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Events\WarehouseCreated;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    public function run()
    {
        $warehouse = Warehouse::create([
            "name" => "Warehouse",
            "short_name" => "WH",
        ]);
        WarehouseCreated::dispatch($warehouse);
    }
}

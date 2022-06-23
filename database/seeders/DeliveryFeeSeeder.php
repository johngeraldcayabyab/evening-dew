<?php

namespace Database\Seeders;

use App\Models\DeliveryFee;
use Illuminate\Database\Seeder;

class DeliveryFeeSeeder extends Seeder
{
    public function run()
    {
        DeliveryFee::create([
            'name' => 'MC Rate',
            'product_id' => 1
        ]);
    }
}

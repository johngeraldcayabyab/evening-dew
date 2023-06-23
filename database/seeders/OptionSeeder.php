<?php

namespace Database\Seeders;

use App\Models\Option;
use Illuminate\Database\Seeder;

class OptionSeeder extends Seeder
{
    public function run(): void
    {
        Option::create([
            'name' => 'sales_order_lines_show_product_image',
            'value' => '1'
        ]);
    }
}

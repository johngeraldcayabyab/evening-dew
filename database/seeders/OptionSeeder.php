<?php

namespace Database\Seeders;

use App\Models\Option;
use Illuminate\Database\Seeder;

class OptionSeeder extends Seeder
{
    public function run(): void
    {
        Option::create([
            'name' => 'sales_order_lines_pdf_columns_view',
            'value' => 'product,description,quantity,unit_price,subtotal,avatar'
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Option;
use Illuminate\Database\Seeder;

class OptionSeeder extends Seeder
{
    public function run(): void
    {
        Option::create([
            'name' => 'transfer_lines_pdf_columns_view',
            'value' => 'product,description,demand,avatar'
        ]);
        Option::create([
            'name' => 'sales_order_lines_pdf_columns_view',
            'value' => 'product,description,quantity,unit_price,tax,subtotal,avatar'
        ]);
        Option::create([
            'name' => 'sales_order_breakdown_view',
            'value' => 'taxable_amount,tax_amount,discount,total'
        ]);
    }
}

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
        /**
         * By default, everything starts in subtotal
         */
        Option::create([
            'name' => 'sales_order_computation_order',
            'value' => 'discount|tax' // if you want to change the order, put the tax first tax|discount
        ]);
        Option::create([
            'name' => 'sales_order_tax_computation_order',
            'value' => 'subtotal' // subtotal | per_unit_price
        ]);
        Option::create([
            'name' => 'sales_order_discount_computation_order',
            'value' => 'subtotal' // subtotal | per_unit_price
        ]);
        Option::create([
            'name' => 'purchase_computation_order',
            'value' => 'discount|tax' // if you want to change the order, put the tax first tax|discount
        ]);
        Option::create([
            'name' => 'purchase_tax_computation_order',
            'value' => 'subtotal' // subtotal | per_unit_price
        ]);
        Option::create([
            'name' => 'purchase_discount_computation_order',
            'value' => 'subtotal' // subtotal | per_unit_price
        ]);
        Option::create([
            'name' => 'invoice_computation_order',
            'value' => 'discount|tax' // if you want to change the order, put the tax first tax|discount
        ]);
        Option::create([
            'name' => 'invoice_tax_computation_order',
            'value' => 'subtotal' // subtotal | per_unit_price
        ]);
        Option::create([
            'name' => 'invoice_discount_computation_order',
            'value' => 'subtotal' // subtotal | per_unit_price
        ]);
    }
}
